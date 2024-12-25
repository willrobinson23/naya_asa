// Get elements
const loginBtn = document.getElementById('loginBtn');
const loginOverlay = document.getElementById('loginOverlay');
const closeBtn = document.getElementById('closeBtn');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

// Open the overlay when clicking the login button
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginOverlay.style.display = 'flex';
});

// Close the overlay
closeBtn.addEventListener('click', () => {
  loginOverlay.style.display = 'none';
});

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get email and password values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Prepare the mutation query
  const mutation = `
    mutation AdaptarLogin($adaptarInfo: AdaptarSessionInput!) {
      adaptarLogin(input: { adaptarInfo: $adaptarInfo }) {
        adaptar {
          id
          email
        }
        errors
      }
    }
  `;

  const variables = {
    adaptarInfo: {
      email: email,
      password: password
    }
  };

  try {
    // Send the request to the server
    const response = await fetch('https://610b-2405-acc0-1307-4d2c-4b17-3d99-9b3c-2389.ngrok-free.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables
      })
    });

    const data = await response.json();

    if (data.errors) {
      // Display SweetAlert2 error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid credentials or other error.',
        confirmButtonText: 'Try Again'
      });
    } else {
      const { adaptar } = data.data.adaptarLogin;
      console.log('Logged in as:', adaptar.email);
      loginOverlay.style.display = 'none'; // Close the overlay on successful login

      // Display SweetAlert2 success message
      Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        text: `Logged in as ${adaptar.email}`,
        confirmButtonText: 'Continue'
      });
    }
  } catch (error) {
    // Display SweetAlert2 error for other issues
    Swal.fire({
      icon: 'error',
      title: 'An error occurred!',
      text: 'Please try again.',
      confirmButtonText: 'Okay'
    });
    console.error('Error logging in:', error);
  }
});
