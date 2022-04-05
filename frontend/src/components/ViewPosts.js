import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import { IconButton } from '@mui/material'

const ViewPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/private/posts')
      setPosts(result.data)
    }
    fetchData()
  }, [])

  const handleLike = async (post) => {
    var likes = post.likes + 1
    //send put request
    const updatedPost = {
      ...post,
      likes: likes
    }
    const token = localStorage.getItem('authToken')
    const result = await axios.put('http://localhost:3001/api/private/posts/' + post._id, updatedPost, {headers: {'authorization': token}})
    console.log(result)
    
  }

  const handleDislike = async (post) => {
    console.log('dislike')
    console.log(post._id)
    var likes = post.likes - 1
  }
  
  return (
    <div className='view-posts'>
      <h2>Posts by others</h2>
      <br></br>
      {posts.map((post, idx) => (
        <div key={idx}>
          <div className='card'>
            <div className='card-header'><img src={`/uploads/${post.setupImage}`} alt='setupImage'/></div>
            <div className='card-body'>
              <h3>{post.title}</h3>
              <br/>
              <p>{post.bio}</p>
            </div>
            <div className='rating-buttons'>
              <IconButton onClick={ () => handleLike(post) }>
                <ThumbUpOffAltIcon/>
              </IconButton>
              <IconButton onClick={ () => handleDislike(post) }>
                <ThumbDownOffAltIcon/>
              </IconButton>              
            </div>
          </div>
          <br></br>
        </div>
      ))}
    </div>
  )
}

//<div className='card-footer'><Link to={'/posts/' + post._id} params={post}><button className='btn'>View Post</button></Link></div>

export default ViewPosts