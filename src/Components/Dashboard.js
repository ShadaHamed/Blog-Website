import { useEffect, useState } from "react";
import BlogRepository from "../BlogRepository";
import { useHistory, Link } from "react-router-dom";


const Dashboard = ({username}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogData = await BlogRepository.getBlogByAuthor(username);
                console.log('blogData', blogData)
                setBlogs(blogData);
                }  catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlog();
    }, [username])

    if (blogs.length === 0) {
        return <div className='dashboard-notfound'>No blogs found for {username}.</div>;
      }

      const handleDelete = async (id) => {
        try {
            await BlogRepository.deleteBlog(id);
            history.go(-1);
        } catch (err) {
            console.error('Failed to delete blog:', err);
        }
    };

    return ( 
        <div className="dashboard">
           <table className="table table-hover">
           <thead className='table-header'>
                <tr>
                    <td>Title</td>
                    <td>Date</td>
                    <td></td>
                    <td></td>
                </tr>
           </thead>
           <tbody className='table-body'>
            {blogs.sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate)).map ( (blog) => (
                    
                    <tr key={blog.id}>
                        <td> 
                            <Link className='blog-title' to={`/blogs/blog/${blog.id}`}>
                                {blog.title}
                            </Link>
                        </td>
                        <td>{blog.fullDate}</td>
                        <td className='blog-action'><Link to={`/update/${blog.id}`}>edit</Link></td>
                        <td className='blog-action'><Link onClick={ () => {handleDelete(blog.id)}}>delete</Link></td>
                    </tr>
    
                    )
                )}
           </tbody>
           </table>
        </div>
     );
}
 
export default Dashboard;