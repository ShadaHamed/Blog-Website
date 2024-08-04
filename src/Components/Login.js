import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../AuthContext";


const Login = () => {
    const [formData, setFormData] = useState(
        {
          email: '',
          password: '',
        }
      )
      
    const [error, setError] = useState('');
    const history = useHistory();
    const {login} = useAuth();

    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
    
        // Perform your authentication logic here (e.g., call an API)

        try {
        const response = await fetch('https://blog-website-1-4i5l.onrender.com/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const { user, token } = await response.json();
            await login(user, token);
            localStorage.setItem('token', token); // Store the token in local storage
            history.push('/');
        } else {
            setError('Invalid email or password');
        }
        } catch (error) {
        console.error('Login failed', error);
        setError('An error occurred, please try again');
        }
    };

    return (  
        <div className="login">
                <form onSubmit={handleSubmit}>
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
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button>Login</button>
                    <Link to='/registeration'><br />Don't have an account</Link>
                </form>
            
        </div>
    );
}
 
export default Login;