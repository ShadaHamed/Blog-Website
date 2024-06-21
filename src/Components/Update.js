import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogRepository from "../BlogRepository";

const Update = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id: id,
        title: '',
        body: '',
        author: '',
        image: null
    });
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null);
    const history = useHistory();

    useEffect(() => {
        console.log('formData', formData)
        console.log('image', formData.image)
    }, [formData])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blog = await BlogRepository.getBlogById(id);
                setFormData(blog)
                setPreviewImage(blog.image)

            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };
        
        fetchData();
    }, [id]);
 
    const handleInputChange = (e) => {
        const {name, value, files} = e.target;
        if (name === "image") {
            const file = files[0];
            setImage(URL.createObjectURL(file))
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
    };
    
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setSelectedImage(file);
    //     setPreviewImage(URL.createObjectURL(file));
    //     setFormData({ ...formData, image: file });
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('body', formData.body);
            formDataToSend.append('author', formData.author);
            formDataToSend.append('fullDate', formData.fullDate);
            formDataToSend.append('Time', formData.time);

            if (formData.image !== null) {
                formDataToSend.append('image', formData.image);
            }
           
            await BlogRepository.updateBlog(id, formDataToSend);
            history.push('/');
        } catch (error) {
            console.error('Error updating data', error);
        }
    };

    return (
        <div className="update">
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <label>Blog Body:</label>
                <textarea
                    name="body"
                    required
                    value={formData.body}
                    onChange={handleInputChange}
                />
               {/* {!image? <img src={require(`../${previewImage}`)} alt="Preview" style={{ maxWidth: '200px' }} />:
               <img src={image} alt="Preview" style={{ maxWidth: '200px' }}/>} */}
                <input type="file"  
                name="image"
                accept="image/*" 
                onChange={handleInputChange} />
                
                <button>Update</button>
            </form>
        </div>
    );
}

export default Update;
