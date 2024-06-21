const API_URL = 'http://localhost:5000';

const UserRepository = {
    getUsers: async () => {
        const response = await fetch(`${API_URL}/users`);
        return response.json();
    },
    getUserProfile: async (author) => {
        console.log('autor from repository', author)
        if (!author) {
            console.error('Error: author parameter is undefined or null');
            return null;
        }
        console.log('autor from repository', author)
        try {
            const response = await fetch(`${API_URL}/users/profile/${author}`);
            console.log('response from repository', response)
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const userData = await response.json();
            console.log('userData from repository', userData)
            console.log('username from repository', userData.username)
            
            return userData;
        } catch (error) {
            console.error('Error fetching user profile',error);
            return { error: error.message };
        }
    }
}
export default UserRepository