export const signUpFormSchema = {
  email: /^[a-z0-9][a-z0-9-]+[a-z0-9]+@([a-z]+\.)+[a-z]{2,20}$/,
  username: /^([a-zA-Z0-9][\w-]+[a-zA-Z0-9]){1,}$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,})$/
};

export const validationMessages = {
  email: 'Please enter a valid email address',
  username:
    'Username must start and end with an alphaNumeric character, may contain "-" or "_" and must be at least 3 characters long.',
  password:
    'Password must contain alphabets and numbers and must be at least 8 characters long'
};