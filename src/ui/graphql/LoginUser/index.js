import React, { useState, useContext } from 'react';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { AuthContext } from 'ui/contexts/Auth';

import { Form as FormAntd, Icon, Input, Button, message } from 'antd';
import { Form, Field } from 'react-final-form';
import { LOGIN_USER } from './gql';
import { fieldNames, constraints } from './model';
import routeTemplates from 'ui/routes/templates';
import validator from 'utils/validator';

const validate = validator(constraints);

const LoginUser = ({ history, client, ...others }) => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  const onSubmit = async values => {
    const { email, password } = values;
    setLoading(true);

    try {
      const { data } = await client.mutate({
        mutation: LOGIN_USER,
        variables: {
          email,
          password,
        },
      });

      const { login } = data;

      if (login && !login.ok && login.errors) {
        message.error(login.errors[0].message);
        setLoading(false);
      } else {
        // this create a feeling of actually calling an api! =)
        setTimeout(() => {
          setToken(login.token);
          message.success('Login successfully!');
          history.push(routeTemplates.dashboard.root);
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <FormAntd onSubmit={handleSubmit}>
          <Field
            name={fieldNames.email}
            render={({ input, meta }) => (
              <FormAntd.Item
                validateStatus={!!meta.touched && !!meta.error ? 'error' : ''}
                help={!!meta.touched && !!meta.error && meta.error}
              >
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder={'Email'}
                  {...input}
                />
              </FormAntd.Item>
            )}
          />

          <Field
            name={fieldNames.password}
            render={({ input, meta }) => (
              <FormAntd.Item
                validateStatus={!!meta.touched && !!meta.error ? 'error' : ''}
                help={!!meta.touched && !!meta.error && meta.error}
              >
                <Input
                  prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder={'Password'}
                  type="password"
                  {...input}
                />
              </FormAntd.Item>
            )}
          />

          <Button
            block
            loading={loading}
            disabled={pristine || invalid}
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </FormAntd>
      )}
    />
  );
};

export default withRouter(withApollo(LoginUser));
