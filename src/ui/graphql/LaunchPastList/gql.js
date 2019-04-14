import gql from 'graphql-tag';

// $sort: "mission_name", $order: "desc"

export const GET_LAUNCH_PAST = gql`
  query GetLaunchPast($limit: Int, $offset: Int, $sort: String, $order: String) {
    launchesPast(limit: $limit, offset: $offset, sort: $sort, order: $order) {
      mission_name
      details
      id
      launch_date_unix
    }
  }
`;
