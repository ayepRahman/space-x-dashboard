// NOTE: best practice for resolver is to pass a gql tag with all the params

export default {
  signUp: (root, { email, password }) => {
    // salt password
  },

  updateUsers: (root, { id, users }, { cache }) => {
    const data = {
      store: {
        users,
        __typename: 'Store',
      },
    };

    cache.writeData({ data });
    return null;
  },
};
