import validate from 'validate.js';

const validator = constraints => values => {
  const result = validate(values, constraints);
  return result;
};

export default validator;
