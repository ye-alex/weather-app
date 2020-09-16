export const validateFields = (name, value) => {
  const error = [];

  if (name === 'email' && !validEmail(value)) {
    error.push('Please input valid email');
  }

  value.length < 6 && (error.push(`Your ${name} is required and should be more than 6 symbols`));

  value.length > 100 && (error.push(`Your ${name} is required and should be less than 100 symbols`));

  return error;
};

const validEmail = field =>
  !!field.toString().match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
