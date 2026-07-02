import React, {useState} from 'react'

const Feed = () => {
    const [posts, setPosts] = useState([
        {
            _id: 1,
            imageUrl: 'https://images.unsplash.com/photo-1682685790910-1e3f5c8b6d4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            caption: 'A beautiful sunset over the mountains.',
            
        }
    ])


  return (
   
    
        <section className='fees-section'>
            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div ket={post._id} className='post-card'>
                            <img className='post-image' src={post.imageUrl} alt={post.caption} />
                            <p className='post-caption'>{post.caption}</p>

                        </div>)
                    )
                ) : (
                    <p className='no-posts-message'>No posts available.</p>
                )
            }
        </section>
  )
}

export default Feed