export const fieldNames = {
  email: 'email',
  password: 'password',
};

export const constraints = {
  [fieldNames.email]: {
    presence: true,
    email: true,
  },
  [fieldNames.password]: {
    presence: true,
    length: {
      minimum: 6,
      maximum: 20,
    },
  },
};
