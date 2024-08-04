import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useDateTime from "../Hooks/useDateTime"
import { useAuth } from "../AuthContext";

const Create = () => {
    const {user} = useAuth();
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const {fullDate, time} = useDateTime();
    const [image, setImage] = useState()
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState(
        {
            title: '',
          body: '',
          author: user.username,
          fullDate: fullDate, 
          time: time,
          image: null,
        }
      )
 
    function handleChange(e) {
        const {name, value, files} = e.target;
        if (name === "image") {
          const file = files[0];
          setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
          
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
    
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('body', formData.body);
        formDataToSend.append('author', formData.author);
        formDataToSend.append('fullDate', formData.fullDate);
        formDataToSend.append('Time', formData.time);
        formDataToSend.append('image', formData.image);
      
        //post data to server
        fetch('https://blog-website-1-4i5l.onrender.com/blogs', {
            method: 'POST',
            body: formDataToSend

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
                    name="title"
                    value={formData.title}
                    onChange={handleChange}>
                </input>
                <label>Blog Body: </label>
                <textarea
                required
                name="body"
                value={formData.body}
                onChange={handleChange}>
                </textarea>
                <label>Add Image:</label>
                <input type="file" 
                name="image"
                accept="image/*"
                onChange={handleChange}
                />
                {/* <img src={require(previewImage)} /> */}

                {!isPending && <button>Add Blog </button>}
                { isPending && <button disabled>Adding Blog ... </button>}
            </form>
        </div>
     );
}
 
export default Create;