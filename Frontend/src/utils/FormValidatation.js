// utils/FormValidation.js

// Function to validate email, password, and optionally first/last names.
// It returns an error message string if validation fails, otherwise returns null.
export const checkValidData = (
  email,
  password,
  firstName = null,
  lastName = null
) => {
  // Regular expression for email validation.
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  // Regular expression for password validation:
  // - At least 8 characters long (.{8,}$)
  // - Contains at least one digit (?=.*\d)
  // - Contains at least one lowercase letter (?=.*[a-z])
  // - Contains at least one uppercase letter (?=.*[A-Z])
  // - Allows letters, numbers, and common symbols.
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/.test(
      password
    );

  // Regular expression for name validation (optional):
  // - Contains only letters and spaces
  const isFirstNameValid = firstName ? /^[A-Za-z\s]+$/.test(firstName) : true;
  const isLastNameValid = lastName ? /^[A-Za-z\s]+$/.test(lastName) : true;

  // Return specific error messages based on validation failure.
  if (!isEmailValid) return "❌ Email is not valid";
  if (!isPasswordValid)
    return "❌ Password must be at least 8 characters, include uppercase, lowercase & number";
  if (firstName && !isFirstNameValid)
    return "❌ First name should contain only letters";
  if (lastName && !isLastNameValid)
    return "❌ Last name should contain only letters";

  // If all validations pass, return null (no error).
  return null;
};
