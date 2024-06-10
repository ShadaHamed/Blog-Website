import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import useDateTime from "./Hooks/useDateTime"
import { useAuth } from "./AuthContext";

const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const {user} = useAuth();
    const [author, setAuthor] = useState(user.username)
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const {fullDate, Time} = useDateTime();
    


    // //get the name of authors
    
    // useEffect ( () => {
    //     fetch('http://localhost:5000/users')
    //     .then(res => { 
    //         console.log('res', res)
    //         if( !res.ok) {
    //             throw Error ('Could not fetch the data for that resource')
    //         }
    //         return res.json(); 
    //     })
    //     .then(data => {
    //             console.log('data', data);
    //             data && data.map((item) => { users.push(item.username)  })
    //         console.log('users: ', users)})
    //     .catch (err => {
    //         console.error('Error:', err)
    //     })
    // }, []);
      

    const handleSubmit = (e) => {
        e.preventDefault();
        // setAuthor(user.username);
        // console.log('user', user.username)
        // console.log('author', author)
        const blog = { title, body, author, fullDate, Time};

        setIsPending(true);
        console.log('blog', blog)
        
        //post data to server
        fetch('http://localhost:5000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then( () => {
            console.log('new blog is added')
            setIsPending(false)
            // history.go(-1)        -- go to previous page
            history.push('/')        // go to Home page
        }
        )
    }

    return ( 
        <div className="create">
            <h2> Add a New Blog </h2>
            <form onSubmit={handleSubmit}>
                <label> Blog Title: </label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </input>
                <label>Blog Body: </label>
                <textarea
                required
                value={body}
                    onChange={(e) => setBody(e.target.value)}>
                </textarea>
     
                
                {!isPending && <button>Add Blog </button>}
                { isPending && <button disabled>Adding Blog ... </button>}
            </form>
        </div>
     );
}
 
export default Create;