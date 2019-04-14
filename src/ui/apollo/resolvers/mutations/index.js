// NOTE: best practice for resolver is to pass a gql tag with all the params
import bcrypt from 'bcryptjs';
import { tryLogin } from 'ui/apollo/resolvers/auth';
// import { formatErrors } from 'ui/apollo/resolvers/auth/formatErrors';
import { GET_ALL_USERS_STATE } from 'ui/apollo/resolvers/gql/user';
import keygen from 'keygen';

const SECRET = process.env.REACT_APP_SECRET;
const SECRET_2 = process.env.REACT_APP_SECRET_2;

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const salt = bcrypt.genSaltSync(SALT_ROUNDS);

export default {
  register: async (root, { email, password }, { cache }) => {
    // IMPT: for apollo local state, it is important to add __typename in the object
    let user = {
      __typename: 'User',
    };

    try {
      const { users } = cache.readQuery({
        query: GET_ALL_USERS_STATE,
      });

      if (email) {
        const userEmailExist = users.filter(user => user.email === email).length;

        if (userEmailExist) {
          return {
            ok: false,
            user: {},
            errors: [{ message: 'An email address has already been taken.', path: 'email' }],
          };
        }
      }

      user.id = keygen.url();
      user.email = email;
      user.password = password;
      user.password = await bcrypt.hashSync(user.password, salt);

      const updatedUsers = [...users, user];

      const data = {
        users: updatedUsers,
        __typename: 'Users',
      };

      cache.writeData({ data });

      return {
        ok: true,
        user,
        errors: [],
      };
    } catch (errors) {
      return {
        ok: false,
        user: {},
        errors,
      };
    }
  },

  login: (root, { email, password }, context) =>
    tryLogin(email, password, context, SECRET, SECRET_2),

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
