import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ViewPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/private/posts')
      setPosts(result.data)
    }
    fetchData()
  }, [])

  return (
    <div className='view-posts'>
      <h4>Posts by others</h4>
      {posts.map((post, idx) => (
        <div key={idx}>
          <h1>{post.author}</h1>
          <p>{post.bio}</p>
          <img src={`/uploads/${post.setupImage}`} alt='setupImage' width='800' height='400'/>
        </div>
      ))}
    </div>
  )
}

export default ViewPosts
