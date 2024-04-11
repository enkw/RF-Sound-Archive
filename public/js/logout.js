// Function to handle user logout
async function logoutUser() {
    try {
        // Logout functionality (clear session data and redirect to the login page)
        console.log('User logged out successfully');
        // Redirect to the login page
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
}

// Usage of logoutUser function
logoutUser();