const API_URL = 'http://localhost:5000';

const BlogRepository = {
    getBlogs: async () => {
        const response = await fetch(`${API_URL}/blogs`);
        return response.json();
    },
    getBlogById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/blogs/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }
            const blogData = await response.json();
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
        try {
            const response = await fetch(`${API_URL}/blogs/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
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
