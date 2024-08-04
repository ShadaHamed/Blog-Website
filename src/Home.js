import { useEffect } from "react";
import BlogList from "./Components/BlogList";
import useFetch from "./Hooks/useFetch";
import { useAuth } from "./AuthContext";
import fetchWithAuth from "./FetchWithAuth";

const Home = () => {
    const {data, isPending, error} = useFetch('https://blog-website-1-4i5l.onrender.com/blogs');
    const { isAuthenticated } = useAuth();
    
    useEffect(() => {
        if (isAuthenticated) {
            fetchWithAuth('https://blog-website-1-4i5l.onrender.com/blogs');
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return ( 
            <div className="home">
                {isPending &&<div>Loading ... </div>}
                {error && <div> {error} </div>} 
                {data && <BlogList blogs={data} title = 'All Blogs' />}

            </div>
         );
    }

        return ( 
        <div className="home">
            {isPending &&<div>Loading ... </div>}
            {error && <div> {error} </div>}
            {data && <BlogList blogs={data} title = 'All Blogs' />}
        </div>
     );
}
 
export default Home;