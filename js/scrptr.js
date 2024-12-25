// Function to show the overlay and registration form
function showRegisterForm() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('registerForm').style.display = 'block';
}
  
// Function to close the form and hide the overlay
function closeRegisterForm() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
}
  
// Handle form submission and trigger mutation
document.getElementById('registerFormElement').onsubmit = function(event) {
    event.preventDefault();
  
    const adaptarInfo = {
      fullName: document.getElementById('fullName').value,
      age: document.getElementById('age').value,
      maritalStatus: document.getElementById('maritalStatus').value,
      contact: document.getElementById('contact').value,
      gender: document.getElementById('gender').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      passwordConfirmation: document.getElementById('passwordConfirmation').value
    };
  
    // Mutation to register the adaptar
    registerAdaptar(adaptarInfo);
};
  
// Function to perform the GraphQL mutation for registration
function registerAdaptar(adaptarInfo) {
    const mutation = `
      mutation RegisterAdaptar($adaptarInfo: AdaptarInput!) {
        registerAdaptar(input:{adaptarInfo: $adaptarInfo}) {
          errors
          message
        }
      }
    `;
  
    const variables = {
      adaptarInfo: adaptarInfo
    };
  
    // GraphQL Request
    fetch('https://610b-2405-acc0-1307-4d2c-4b17-3d99-9b3c-2389.ngrok-free.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // If needed
      },
      body: JSON.stringify({ query: mutation, variables: variables })
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        console.log('Registration failed:', data.errors);
      } else {
        console.log('Registration successful:', data.data.registerAdaptar.message);
        
        // Show success alert with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: data.data.registerAdaptar.message,
          confirmButtonText: 'OK',
          timer: 3000, // Auto closes after 3 seconds
          showConfirmButton: true
        });
        
        closeRegisterForm(); // Close the form after successful registration
      }
    })
    .catch(error => {
      console.error('Error in registration:', error);
    });
}
