import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Authors = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const author = {username, email, password};

        fetch('http://localhost:8000/users',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(author)
        }).then( () =>
           { alert('Great! You can now create our first blog');
            history.push('/create')}
        )
    }

    return ( 
        <div className="authors">
            <h2>Be one of our authors: </h2>
            <form onSubmit={handleSubmit}>
                <div class="mb-3 mt-3">
                        <label for="username" class="form-label">Username:</label>
                        <input type="text" class="form-control" id="username" placeholder="Enter username" name="username"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div class="mb-3">
                        <label for="pwd" class="form-label">Password:</label>
                        <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    
                    <button type="submit" class="btn ">Submit</button>
                
                </form>
            
        </div>
     );
}
 
export default Authors;