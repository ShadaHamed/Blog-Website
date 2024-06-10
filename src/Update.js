import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogRepository from "./BlogRepository";

const Update = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        id: id,
        title: '',
        body: '',
        author: ''
    });

    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/blogs/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog');
                }
                const blogData = await response.json();
                setValues({
                    id: id,
                    title: blogData.title,
                    body: blogData.body
                });
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };
    
        fetchData();
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await BlogRepository.updateBlog(id, values);
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
                    required
                    value={values.title}
                    onChange={(e) => setValues({ ...values, title: e.target.value })}
                />
                <label>Blog Body:</label>
                <textarea
                    required
                    value={values.body}
                    onChange={(e) => setValues({ ...values, body: e.target.value })}
                />
                <button>Update</button>
            </form>
        </div>
    );
}

export default Update;
