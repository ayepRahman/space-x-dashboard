import gql from 'graphql-tag';

const GET_ALL_USERS_STATE = gql`
  query GetAllUsers {
    users @client {
      id
      email
      password
      __typename
    }
  }
`;

export { GET_ALL_USERS_STATE };
