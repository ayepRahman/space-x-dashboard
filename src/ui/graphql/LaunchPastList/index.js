import React, { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import { Table } from 'antd';
import { GET_LAUNCH_PAST } from './gql';
import moment from 'moment';

// Api params - https://docs.spacexdata.com/#bc65ba60-decf-4289-bb04-4ca9df01b9c1

const ORDER_TYPES = {
  ascend: 'asc',
  descend: 'desc',
};

const LaunchPastList = ({ client }) => {
  const [state, setState] = useState({
    limit: 10,
    offSet: 10,
    sort: '',
    order: '',
    data: [],
    loading: false,
    columns: [
      {
        title: 'Id',
        dataIndex: 'id',
        // sorter: true,
      },
      {
        title: 'Mission',
        dataIndex: 'mission_name',
        sorter: true,
      },
      {
        title: 'Details',
        dataIndex: 'details',
        // sorter: true,
      },
      {
        title: 'Date',
        dataIndex: 'launch_date_unix',
        // sorter: true,
      },
    ],
  });

  useEffect(() => {
    getLaunchesPast();
  }, []);

  useEffect(() => {
    getLaunchesPast();
  }, [state.sort, state.order]);

  const handleChange = (pagination, filters, sorter) => {
    setState({
      ...state,
      sort: sorter.field,
      order: ORDER_TYPES[sorter.order],
    });
  };

  const getLaunchesPast = async () => {
    setState({
      ...state,
      loading: true,
    });

    try {
      const response = await client.query({
        query: GET_LAUNCH_PAST,
        variables: {
          limit: state.limit,
          offset: state.offSet,
          sort: state.sort,
          order: state.order,
        },
      });

      const { data, errors } = response;

      if (errors) {
        setState({
          ...state,
          loading: false,
        });
      } else {
        const newData =
          data &&
          data.launchesPast &&
          data.launchesPast.map(launch => {
            if (typeof launch.launch_date_unix === 'number') {
              launch.launch_date_unix = moment.unix(launch.launch_date_unix).format('L');
            }

            return launch;
          });

        setState({
          ...state,
          data: newData,
          loading: false,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });
    }
  };

  return (
    <div>
      <Table
        rowKey={data => data.id}
        columns={state.columns}
        onChange={handleChange}
        dataSource={state.data}
        loading={state.loading}
      />
    </div>
  );
};

export default withApollo(LaunchPastList);
