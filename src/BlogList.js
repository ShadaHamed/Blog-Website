import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "./AuthContext";
import { Container, Row, Col, Card } from "react-bootstrap";

const BlogList = ({blogs, title}) => {
    const [showFullBlog, setShowFullBlog] = useState(false)
    const { user, logout} = useAuth();
    const handleShowBlog = () => {

        setShowFullBlog(!showFullBlog)
    }
    return ( 
        <Container fluid className="BlogList mt-5">
            <h1 className="text-center"> {title} </h1>
            {user? (<Link className=" btn new-blog" to="/create" style={{
                color: 'white',
                backgroundColor: '#f1356d',
                borderRadius: '10px'
            }}>Create your own Blog</Link>):
            (<Link className=" btn new-blog" to="/login" style={{
                color: 'white',
                backgroundColor: '#f1356d',
                borderRadius: '10px'
            }}>Create your own Blog</Link>)}
            <row className="blog-grid justify-content-center">
                {blogs.map(blog => (
                <Col xs={6} md={12} lg={12} className="blog-preview" key={blog.id} >
                    <Card className="blog-card">
                        {blog.image? <Card.Img variant="top" src={blog.image} className="card-img rounded "/>: <Card.Img variant="top" className="card-img rounded " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Gfel-AapoSZTh5Lnp4WWv4lypUWN7wbqZg&s"/>}
                        <Card.Body className="card-body">
                            <div className="blog-date-time">
                            <p className="blog-fulldate">{blog.fullDate}</p>
                            <p className="blog-time">{blog.Time}</p>
                            </div>
                            <Card.Title> {blog.title} </Card.Title>
                            <Card.Text>{showFullBlog?  blog.body: blog.body.slice(0,100)}</Card.Text>
                            <Link to={`/blogs/${blog.id}`}>
                                <button className=" btn read-more" onClick={handleShowBlog}> read {showFullBlog? 'less': 'more'}</button>
                            </Link>
                            <p>Written by {blog.author}</p>
                        </Card.Body>
                    </Card>
                </Col>))}
            </row>
        
        </Container>
        
     );
}
 
export default BlogList;