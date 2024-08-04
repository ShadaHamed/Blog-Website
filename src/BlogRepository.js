const API_URL = 'https://blog-website-1-4i5l.onrender.com';

const BlogRepository = {
    getBlogs: async () => {
        const response = await fetch(`${API_URL}/blogs`);
        return response.json();
    },
    getBlogById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/blogs/blog/${id}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }
            const blogData = await response.json();
            console.log(blogData)
            return blogData;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    getBlogByAuthor: async (author) => {
        try {
            const response = await fetch(`${API_URL}/blogs/author/${author}`);
            console.log('response from BlogRepository', response);

            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }
            const blogData = await response.json();
            console.log('blogData from repository', blogData);

            return blogData;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    createBlog: async (blog) => {
        const response = await fetch(`${API_URL}/blogs`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        });
        return response.json();
    },
    deleteBlog: async (id) => {
        const response = await fetch(`${API_URL}/blogs/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete blog');
        }
    },
    updateBlog: async (id, updatedData) => {
        console.log('updatedData from update', updatedData)
        
        try {
            const response = await fetch(`${API_URL}/blogs/${id}`, {
                method: 'PUT',
                body: updatedData
            });
            if (!response.ok) {
                console.error('Failed to update blog:', response.status, response.statusText);
                return null;
            }
            return response.json();
        } catch (error) {
            console.error('An error occurred while updating the blog:', error);
            return null;
        }
    }
};

export default BlogRepository;
