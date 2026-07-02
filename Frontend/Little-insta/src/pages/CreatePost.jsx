import React, { useEffect, useState } from 'react'

const CreatePost = () => {
  const [caption, setCaption] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl('')
      return undefined
    }

    const nextPreviewUrl = URL.createObjectURL(imageFile)
    setPreviewUrl(nextPreviewUrl)

    return () => {
      URL.revokeObjectURL(nextPreviewUrl)
    }
  }, [imageFile])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className='create-post-page'>
      <section className='create-post-card'>
        <div className='create-post-header'>
          <p className='create-post-kicker'>Share a new moment</p>
          <h1>Create Post</h1>
          <p className='create-post-copy'>Upload an image, add a short caption, and post it in a clean, simple layout.</p>
        </div>

        <div className='create-post-grid'>
          <form className='create-post-form' onSubmit={handleSubmit}>
            <label className='field-label' htmlFor='image'>Image</label>
            <input
              id='image'
              className='file-input'
              type='file'
              name='image'
              accept='image/*'
              required
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
            />

            <label className='field-label' htmlFor='caption'>Caption</label>
            <textarea
              id='caption'
              className='caption-input'
              name='caption'
              placeholder='Write something short and clear...'
              rows='5'
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />

            <button className='submit-button' type='submit'>
              Create Post
            </button>
          </form>

          <aside className='preview-panel'>
            <p className='preview-label'>Preview</p>
            <div className='preview-card'>
              {previewUrl ? (
                <img className='preview-image' src={previewUrl} alt='Selected preview' />
              ) : (
                <div className='preview-placeholder'>
                  <span>Image preview appears here</span>
                </div>
              )}

              <div className='preview-caption'>
                <strong>Your caption</strong>
                <p>{caption.trim() || 'Add a caption to see it here.'}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default CreatePost