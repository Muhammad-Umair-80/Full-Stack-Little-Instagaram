import React from 'react'

const CreatePost = () => {
  return (
    <section className='create-post'>
      <h1>Create Post</h1>

      <form>
        <input type="file" name="image" accept="image/*" required />
        <input type="text" name="caption" placeholder="Caption" />
        <button type="submit">Create Post</button>
      </form>

    </section>
  )
}

export default CreatePost