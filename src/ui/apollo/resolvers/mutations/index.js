// NOTE: best practice for resolver is to pass a gql tag with all the params
import bcrypt from 'bcryptjs';
import { tryLogin } from 'ui/apollo/resolvers/auth';
import { formatErrors } from 'ui/apollo/resolvers/auth/formatErrors';

const SECRET = process.env.REACT_APP_SECRET;
const SECRET_2 = process.env.REACT_APP_SECRET_2;

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const salt = bcrypt.genSaltSync(SALT_ROUNDS);

export default {
  register: async (root, args, context) => {
    let user = args;

    console.log(user);

    try {
      user.password = await bcrypt.hashSync(user.password, salt);

      //TODO: add user to local storage

      user = '';

      // user = await new models.User(user).save();
      user._id = user._id.toString();

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
