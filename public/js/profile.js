// Function to fetch and display user profile information
async function displayUserProfile(userId) {
    try {
        const response = await fetch('/api/profile/${userId}');

        // Display the user's profile information on the profile page
        if (response.ok) {
            const userData = await response.json();
            console.log(`Fetching user profile for user with ID: ${userId}`);
            console.log('User Profile:', userData);
        } else {
            console.log('Error fetching user profile');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
    }
}

// Usage of displayUserProfile function
displayUserProfile(123); // Pass the user's ID as an argument
