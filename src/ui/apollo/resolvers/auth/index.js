import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import { GET_ALL_USERS_STATE } from 'ui/apollo/resolvers/gql/user';

export const createTokens = async (user, SECRET, SECRET_2) => {
  // verify: need secret | user me for authentication
  // decode: no secret | user me on the client side

  // TODO: add teamId here to
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id', 'email']),
    },
    SECRET,
    {
      expiresIn: '1d',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, ['id', 'email']),
    },
    SECRET_2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, models, SECRET, SECRET_2) => {
  let userId = 0;

  try {
    const {
      user: { id },
    } = jwt.decode(refreshToken);

    userId = id;
  } catch (error) {
    console.log('refreshTokens', error);
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findById(userId);

  if (!user) {
    return {};
  }

  const refreshTokenSecret = user.password + SECRET_2;

  try {
    jwt.verify(refreshToken, refreshTokenSecret);
  } catch (error) {
    console.log('refreshTokens', error);
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (email, password, { cache }, SECRET, SECRET_2) => {
  let user;

  try {
    const { users } = cache.readQuery({
      query: GET_ALL_USERS_STATE,
    });
    user = users.find(user => user.email === email);

    if (!user) {
      return {
        ok: false,
        errors: [
          {
            path: 'email',
            message: 'Wrong email',
          },
        ],
      };
    }

    // comparing CLIENT HASH password with local state password which is a HASH/SALT password, return a bool
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        ok: false,
        errors: [
          {
            path: 'password',
            message: 'Wrong password',
          },
        ],
      };
    }

    const refreshTokenSecret = user.password + SECRET_2;

    const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

    return {
      ok: true,
      token,
      refreshToken,
    };
  } catch (error) {
    return {
      ok: false,
      errors: [error],
    };
  }
};
