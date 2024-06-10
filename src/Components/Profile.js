import React from 'react'

const Profile = () => {
  return (
    <div className='user-profile-card'>
        <div className='gradiant'></div>
        <div className='profile-down'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Gfel-AapoSZTh5Lnp4WWv4lypUWN7wbqZg&s' alt='profile image' />
            <div className='profile-title'>User Name</div>
            <div className='profile-description'>here we can write a description for each user in our website</div>
        </div>
        <div className='profile-button'><a href='mailto:user@email.com'>Contact Me</a></div>
    </div>
  )
}

export default Profile