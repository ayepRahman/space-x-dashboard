// NOTE: best practice for resolver is to pass a gql tag with all the params
import bcrypt from 'bcryptjs';
import { tryLogin } from 'ui/apollo/resolvers/auth';
import { formatErrors } from 'ui/apollo/resolvers/auth/formatErrors';
import { GET_ALL_USERS_STATE } from 'ui/apollo/resolvers/gql/user';
import keygen from 'keygenerator';

const SECRET = process.env.REACT_APP_SECRET;
const SECRET_2 = process.env.REACT_APP_SECRET_2;

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const salt = bcrypt.genSaltSync(SALT_ROUNDS);

export default {
  register: async (root, { email, password }, { cache }) => {
    let user;

    try {
      if (email) {
        const { users } = cache.readQuery({
          query: GET_ALL_USERS_STATE,
        });

        debugger;
        return {
          ok: false,
          errors: [{ message: 'An email address has already been taken.', path: 'email' }],
        };
      }
      user.id = keygen._();
      user.email = email;
      user.password = password;
      user.password = await bcrypt.hashSync(user.password, salt);

      console.log('register successfully', user);

      return {
        ok: true,
        user,
      };
    } catch (errors) {
      console.log('REGISTER ERROR', errors);

      return {
        ok: false,
        errors,
      };
    }
  },

  login: (root, { email, password }, context) => tryLogin(email, password, SECRET, SECRET_2),

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
