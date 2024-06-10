import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Authors = () => {
  const [formData, setFormData] = useState(
    {
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  )
    const [error, setError] = useState('')
    const history = useHistory()

    const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      if (!validateEmail(formData.email)) {
        setError('Invalid email format')
      }
      else if (formData.password !== formData.confirm_password) {
        setError('Passwords do not match')
      }

      setError('');
      console.log(formData)
      fetch('http://localhost:5000/users',{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
      })
      .then( (response) =>{
        if (response.ok) {
          return response.json();
          // alert('Great! You are one of our authors now');
          // history.push('/')
        }
        else{
          return response.json().then((data) => {
            throw new Error(data.message || 'Error registering user');
        //  setError('Error registering user. Please try again later.')
      })}
    })
      .then((data) => {
        alert('Great! You are one of our authors now');
        history.push('/');
      })
      .catch((error) => {
        setError('Error registering user. Please try again later.')
        console.error('Error', error);
      })
      
    }

    return ( 
        <div className="registeration">
            <form onSubmit={handleSubmit}>
                <div class="mb-3 mt-3">
                  <h2>Be one of our authors: </h2>
                        <label for="username" class="form-label">Username:</label>
                        <input type="text" class="form-control" id="username" placeholder="Enter username" name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="password" class="form-label">Password:</label>
                        <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required/>

                    </div>
                    <div class="mb-3 mt-3">
                        <label for="confirm_password" class="form-label">Confirm Password:</label>
                        <input type="password" class="form-control" id="c-pwd" placeholder="Repeat password" name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required/>
                    </div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button type="submit" class="btn ">Submit</button>
                
                </form>
            
        </div>
     );
}
 
export default Authors;