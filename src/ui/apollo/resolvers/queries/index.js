export default {
  login: (root, { email, password }) => {},

  getUserById: (root, { id }, { cache }) => {
    try {
      const { store } = cache.readQuery({
        // query: GET_ALL_USERS_STATE,
      });

      const users = store && store.users;
      const findUser = users.find(user => user.id === id);

      return {
        user: findUser,
      };
    } catch (error) {
      console.log(error.message);
      return {
        error: error.message,
      };
    }
  },
  getAllUsers: (root, args, context) => {
    const { cache } = context;

    try {
      const { store } = cache.readQuery({
        // query: GET_ALL_USERS_STATE,
      });
      const users = store && store.users;

      return {
        users,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
