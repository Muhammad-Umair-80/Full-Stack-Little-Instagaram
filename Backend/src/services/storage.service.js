require('dotenv').config();
const ImageKit = require('@imagekit/nodejs');

const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

if (!privateKey) {
    throw new Error(
        "IMAGEKIT_PRIVATE_KEY is missing or empty. Add it to your .env file or instantiate ImageKit with a privateKey option."
    );
}

const imagekitInstance = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
});

async function uploadImageToImageKit(buffer) {
    const response = await imagekitInstance.files.upload({
        file: buffer.toString('base64'),
        fileName: "image.jpg",
    });

    return response;
}

module.exports = uploadImageToImageKit;