const mongoose = require('mongoose');

const DEFAULT_RETRIES = 5;
const DEFAULT_RETRY_DELAY = 3000; // ms

const getMongoUri = () => {
  const user = process.env.MONGO_USER;
  const pass = process.env.MONGO_PASS;
  const dbName = process.env.MONGO_DB || 'little-insta';
  const envUri = process.env.MONGO_URI?.trim();

  if (envUri && envUri.includes('@') && envUri.includes('mongodb')) {
    return envUri;
  }

  if (envUri && user && pass) {
    const authPrefix = `mongodb${envUri.startsWith('mongodb+srv://') ? '+srv' : ''}://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@`;
    const uriWithoutPrefix = envUri.replace(/^mongodb(\+srv)?:\/\//, '');
    const uriWithAuth = `${authPrefix}${uriWithoutPrefix}`;
    return uriWithAuth.includes(dbName)
      ? uriWithAuth
      : `${uriWithAuth.replace(/\/?$/, '')}/${dbName}?retryWrites=true&w=majority`;
  }

  if (user && pass) {
    return `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@cluster0.ehi9tvk.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  }
  
  return 'mongodb+srv://umair:Khan123@cluster0.ehi9tvk.mongodb.net/little-insta';
};

const maskPassword = (uri) => {
  try {
    // mask the password between ':' and '@' in the auth part
    return uri.replace(/(:)([^:@]+)(@)/, '$1*****$3');
  } catch (e) {
    return uri;
  }
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const connectDB = async (retries = DEFAULT_RETRIES) => {
  const uri = getMongoUri();
  mongoose.set('strictQuery', false);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`MongoDB: attempting connection (attempt ${attempt}) to ${maskPassword(uri)}`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log('MongoDB Connected Successfully!');
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
      // If SRV DNS queries are refused, try a non-SRV standard connection string as a fallback.
      if (
        error &&
        (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') &&
        error.syscall === 'querySrv'
      ) {
        try {
          // Use hardcoded non-SRV connection string with known shard hosts
          // Username: umair, Password: Khan123, Database: little-insta
          const nonSrv = 'mongodb://umair:Khan123@ac-wemi5uv-shard-00-00.ehi9tvk.mongodb.net:27017,ac-wemi5uv-shard-00-01.ehi9tvk.mongodb.net:27017,ac-wemi5uv-shard-00-02.ehi9tvk.mongodb.net:27017/little-insta?tls=true&authSource=admin&retryWrites=true&w=majority';
          console.log('Attempting non-SRV connection to', maskPassword(nonSrv));
          await mongoose.connect(nonSrv, { serverSelectionTimeoutMS: 5000 });
          console.log('MongoDB Connected Successfully (non-SRV)!');
          return;
        } catch (fallbackErr) {
          console.error('Non-SRV fallback failed:', fallbackErr.message);
        }
      }
      if (attempt < retries) {
        console.log(`Retrying in ${DEFAULT_RETRY_DELAY}ms...`);
        await sleep(DEFAULT_RETRY_DELAY);
      } else {
        console.error('MongoDB Connection Failed after retries.');
        console.error(error);
        // bubble up the error so the caller can decide what to do
        throw error;
      }
    }
  }
};

module.exports = connectDB;
