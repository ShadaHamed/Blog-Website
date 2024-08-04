import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import BlogRepository from "../BlogRepository";
import { useState, useEffect } from "react";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogData = await BlogRepository.getBlogById(id);
                if (blogData) {
                    setBlog(blogData);
                } else {
                    setError('Blog not found');
                }
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleDelete = async (id) => {
        try {
            await BlogRepository.deleteBlog(id);
            history.push('/');
        } catch (err) {
            console.error('Failed to delete blog:', err);
        }
    };

    return (
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <div> <img src={require(`../${blog.image}`)} width='500px' hight='600' alt='blog-image'/></div>
                    <h1>{blog.title}</h1>
                    <p>Written by {blog.author}</p>
                    <div className="blog-body">{blog.body}</div>
                    <Link className="edit" to={`/update/${id}`}>Edit</Link>
                    <button className="delete" onClick={() => handleDelete(id)}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;
