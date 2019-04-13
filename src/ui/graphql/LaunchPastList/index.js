import React, { useState } from 'react';
import { withApollo } from 'react-apollo';

import { Table, Button } from 'antd';

// Api params - https://docs.spacexdata.com/#bc65ba60-decf-4289-bb04-4ca9df01b9c1

/**
 * TODO:
 * [] Add table
 * [] Add Query component
 * [] Add handlePageNumber - offset by increment by 10
 * [] Add handleSort - [sort]: "key", [order]: "asc" || "desc"
 * [] loading in table row ?
 */

const LaunchPastList = () => {
  const [state, setState] = useState({
    limit: 10,
    offSet: 10,
    sort: '',
    order: '',
  });

  const handleOffset = offSet => {
    setState({
      ...state,
      offSet,
      sort: '',
      order: '',
    });
  };

  const handleSort = (sort, order) => {
    setState({
      ...state,
      sort,
      order,
    });

    getLaunchesPast();
  };

  const getLaunchesPast = () => {
    try {
    } catch (error) {}
  };

  return <div />;
};

export default LaunchPastList;
