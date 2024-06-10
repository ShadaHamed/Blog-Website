import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import Authors from "./Authors";
import DateTime from "./Components/DateTime";
import { useAuth } from "./AuthContext";
import fetchWithAuth from "./FetchWithAuth";
const Home = () => {
    const {data, isPending, error} = useFetch('http://localhost:5000/blogs');
    const { isAuthenticated, user, logout } = useAuth();
    
    useEffect(() => {
        if (isAuthenticated) {
            fetchWithAuth('http://localhost:5000/blogs');
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

    if (!user) {
        return <div>Loading user data...</div>;
    }

        return ( 
        <div className="home">
            {isPending &&<div>Loading ... </div>}
            {error && <div> {error} </div>}
            {data && <BlogList blogs={data} title = 'All Blogs' />}
            {/* {authors && <Authors authors={authors} title = 'All Authors'/>} */}
        </div>
     );
}
 
export default Home;