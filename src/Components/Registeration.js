import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Registeration  = () => {
  const [formData, setFormData] = useState(
    {
      username: '',
      email: '',
      password: '',
      confirm_password: '', 
      photo: null,
    }
  )
    const [error, setError] = useState('')
    const history = useHistory()

    const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
    }
    useEffect(() => {
      console.log('formData', formData);
    }, [formData]);

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (name === "photo") {
          const file = files[0];
          setFormData((prevFormData) => ({
      ...prevFormData,
      photo: file,
    }));
          
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
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

      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('confirm_password', formData.confirm_password);
      formDataToSend.append('photo', formData.photo);

      fetch('https://blog-website-1-4i5l.onrender.com/users',{
      method: 'POST',
      body: formDataToSend
      })
      .then( async(response) =>{
        if (response.ok) {
          console.log('response',response)
          return response.json();
        }
        else{
          return response.json().then((data) => {
            throw new Error(data.message || 'Error registering user');
      })}
    })
      .then((data) => {
        console.log('Response data:', data);
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
                    <div class="mb-3 mt-3">
                        <label for="photo" class="form-label">Upload Photo:</label>
                        <input type="file" class="form-control" id="file-input" accept="image/*" placeholder="upload your photo" name="photo"
                        onChange={handleChange}
                        required/>
                    </div>

                    {/* <div id="preview-container">
                      {previewImage && (
                        <img
                          id="preview-image"
                          src={previewImage}
                          alt="Preview"
                          style={{ maxWidth: "50px", display: "inline-block" }}
                        />
                      )}
                    </div> */}
                    
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button type="submit" class="btn ">Submit</button>
                
                </form>
            
        </div>
     );
}
 
export default Registeration;