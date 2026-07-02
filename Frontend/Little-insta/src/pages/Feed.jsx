import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Feed = () => {
        const [posts, setPosts] = useState([
        {
            _id: 1,
            imageUrl: 'https://images.unsplash.com/photo-1682685790910-1e3f5c8b6d4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            caption: 'A beautiful sunset over the mountains.',
                        
    }
    ])
    useEffect(() => {
        
        axios.get('http://localhost:3000/posts')
            .then((response) => {
                console.log(response.data.posts)
               setPosts(response.data.posts);
            })
    }, [])

  return (
        <main className='feed-page'>
            <section className='feed-hero'>
                <div>
                    <span className='feed-kicker'>Latest posts</span>
                    <h1>Feed</h1>
                    <p>Browse the most recent moments shared by the community.</p>
                </div>
                
            </section>

            <section className='feed-grid'>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <article key={post._id} className='post-card'>
                            <div className='post-media'>
                                <img className='post-image' src={post.imageUrl} alt={post.caption} />
                                <p className='post-caption'>{post.caption}</p>
                            </div>

                           

                                

                               
                            
                        </article>
                    ))
                ) : (
                    <p className='no-posts-message'>No posts available.</p>
                )}
            </section>
        </main>
  )
}

export default Feed