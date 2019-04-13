import gql from 'graphql-tag';

export const SIGN_UP_USER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) @client {
      ok
      user
      errors
    }
  }
`;
