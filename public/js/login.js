// Function to handle user login
async function loginUser(username, password) {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        // Redirect to the dashboard or homepage
        if (response.ok) {
            console.log('User logged in successfully');
            
        // Display user error message
        } else {
            console.log('Invalid username or password');
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
    }
}

// Usage of loiginUser function
loginUser('admin', 'password');