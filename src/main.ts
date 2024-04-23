import './style.css'


function validateForm(): boolean {
  const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
  const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  const address = (document.getElementById('address') as HTMLInputElement).value;
  const city = (document.getElementById('city') as HTMLInputElement).value;
  const state = (document.getElementById('state') as HTMLInputElement).value;
  const pincode = (document.getElementById('pincode') as HTMLInputElement).value;
  const gender = document.querySelector('input[name="gender"]:checked') as HTMLInputElement;
  const mobile=(document.getElementById('mobile') as HTMLInputElement).value;

  const firstNameError = document.getElementById('firstNameError') as HTMLSpanElement;
  const lastNameError = document.getElementById('lastNameError') as HTMLSpanElement;
  const emailError = document.getElementById('emailError') as HTMLSpanElement;
  const passwordError = document.getElementById('passwordError') as HTMLSpanElement;
  const addressError = document.getElementById('addressError') as HTMLSpanElement;
  const cityError = document.getElementById('cityError') as HTMLSpanElement;
  const stateError = document.getElementById('stateError') as HTMLSpanElement;
  const pincodeError = document.getElementById('pincodeError') as HTMLSpanElement;
  const genderError = document.getElementById('genderError') as HTMLSpanElement;
  const mobileError= document.getElementById('mobileError') as HTMLSpanElement;

  // Regular expressions for validations
  const nameRegex = /^[a-zA-Z\s]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
  const pincodeRegex = /^\d{6}$/;
  const mobileRegex=/^[6-9]\d{9}$/;

  // Reset error messages
  firstNameError.textContent = '';
  lastNameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  addressError.textContent = '';
  cityError.textContent = '';
  stateError.textContent = '';
  pincodeError.textContent = '';
  genderError.textContent = '';
  mobileError.textContent='';

  let isValid: boolean = true;

  if (!nameRegex.test(firstName)) {
      isValid = false;
      firstNameError.textContent = 'First Name must be 3 to 20 characters long and contain only letters.';
  }

  if (!nameRegex.test(lastName)) {
      isValid = false;
      lastNameError.textContent = 'Last Name must be 3 to 20 characters long and contain only letters.';
  }

  if (!emailRegex.test(email)) {
      isValid = false;
      emailError.textContent = 'Invalid email format.';
  }

  if (!passwordRegex.test(password)) {
      isValid = false;
      passwordError.textContent =
          'Password must be 8 to 16 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).';
  }

  if (address.length === 0) {
   isValid=false;
   addressError.textContent='Address is required'
  }
  if (address.length > 250) {
      isValid = false;
      addressError.textContent = 'Address must be less than 250 characters.';
  }

  if (!city) {
      isValid = false;
      cityError.textContent = 'City is required.';
  }

  if (!state) {
      isValid = false;
      stateError.textContent = 'State is required.';
  }

  if (!pincodeRegex.test(pincode)) {
      isValid = false;
      pincodeError.textContent = 'Pincode must be 6 digits.';
  }

  if (!gender) {
      isValid = false;
      genderError.textContent = 'Gender is required.';
  }
  if(!mobileRegex.test(mobile)){
    isValid = false;
    mobileError.textContent='Please enter a valid mobile number'
  }

  if (isValid) {
      const formData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          address: address,
          city: city,
          state: state,
          pincode: pincode,
          mobile: mobile,
          gender: gender.value
      };

      fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch((error) => {
          console.error('Error:', error);
      });

      return true; // Allow form submission
  }

  return false; // Prevent form submission
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm') as HTMLFormElement;
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (validateForm()) {
      // If form is valid, you can submit it here or handle it accordingly
      form.submit(); // Example: Submit the form
    }
  });
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="container">
        <h1>Registration Form</h1>
        <form id="registrationForm" onsubmit="return validateForm()">
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName">
                <span class="error" id="firstNameError"></span>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName">
                <span class="error" id="lastNameError"></span>
            </div>
            <div class="form-group">
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob">
                <span class="error" id="dobError"></span>
            </div>
            <div class="form-group">
                <label>Gender:</label><br />
                <input type="radio" id="male" name="gender" value="male">
                <label for="male">Male</label>
                <input type="radio" id="female" name="gender" value="female">
                <label for="female">Female</label>
                <input type="radio" id="other" name="gender" value="other">
                <label for="other">Other</label>
                <span class="error" id="genderError"></span>
            </div>
            <div class="form-group">
                <label for="mobile">Mobile Number:</label>
                <input type="text" id="mobile" name="mobile">
                <span class="error" id="mobileError"></span>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email">
                <span class="error" id="emailError"></span>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
                <span class="error" id="passwordError"></span>
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" name="address">
                <span class="error" id="addressError"></span>
            </div>
            <div class="form-group">
                <label for="city">City:</label>
                <input type="text" id="city" name="city">
                <span class="error" id="cityError"></span>
            </div>
            <div class="form-group">
                <label for="state">State:</label>
                <input type="text" id="state" name="state">
                <span class="error" id="stateError"></span>
            </div>
            <div class="form-group">
                <label for="pincode">Pincode:</label>
                <input type="text" id="pincode" name="pincode">
                <span class="error" id="pincodeError"></span>
            </div>
            <div class="form-group">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
`;