import  { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import UserRepository from '../UserRepository'
import Dashboard from './Dashboard'

const Profile = () => {
  const {username} = useParams()
  console.log('username from profile', username)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const history = useHistory();
  const [showAuthorBlogs, setShowAuthorBlogs] = useState(false);

  useEffect ( () => {
    console.log('useeffect')
    const fetchUserProfile = async() =>{
    try {
      const userData = await UserRepository.getUserProfile(username)
      console.log('userData from profile', userData)
      if (userData === 0) {
        setError('Failed to fetch user profile');
      } else {
        setUser(userData)
        console.log('user from profile', user)
        console.log('username from profile', user.username);
      }
    }
      catch (err) {
        setError(err.message);
      }}
      fetchUserProfile()
  }, [username])

  if (!user || !user.username) {
    return <div>Loading...</div>;
  }

  const handleAuthorBlogsClick = () => {
    setShowAuthorBlogs(!showAuthorBlogs)
  };

  return (
    <div className='user-profile-card'>
        <div className='gradiant'></div>
        <div className='profile-down'>
       
          <img src={require(`../${user.photo}`)} alt='profile image' />
          <div className='profile-title'>{user.username}</div>
          <div className='profile-description'>here we can write a description for each user in our website</div>
         
        </div>
        <div className='profile-link'><a href='mailto:user@email.com'>Contact Me</a></div>
        {!showAuthorBlogs?
        <button className='profile-button' onClick={handleAuthorBlogsClick}>See your all blogs</button>
        :<button className='profile-button' onClick={handleAuthorBlogsClick}>See less</button>}
        {showAuthorBlogs && <Dashboard username={username} />}

        {/* <div className='profile-button'><a href={`/blogs/author/${user.username}`}>See your all blogs</a></div> */}
    </div>
  )
}

export default Profile