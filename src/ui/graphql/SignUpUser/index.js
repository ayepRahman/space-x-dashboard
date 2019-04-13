import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Form as FormAntd, Icon, Input, Button, message } from 'antd';
import { Form, Field } from 'react-final-form';
import { SIGN_UP_USER } from './gql';
import { fieldNames, constraints } from './model';
import routeTemplates from 'ui/routes/templates';
import validator from 'utils/validator';

const validate = validator(constraints);

const SignUpUser = ({ history, client, ...others }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async values => {
    const { email, password } = values;
    setLoading(true);
    debugger;
    try {
      const { data } = await client.mutate({
        mutation: SIGN_UP_USER,
        variables: {
          email,
          password,
        },
      });

      const { register } = data;

      if (register && !register.ok && register.errors) {
        message.error(register.errors[0].message);
        setLoading(false);
      } else {
        message.success('Sign up successfully!');
        history.push(routeTemplates.auth.login);
        setLoading(false);
      }

      debugger;
    } catch (error) {
      message.error(error.message);
      setLoading(false);
      debugger;
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

          <div className="float-right">
            <Button
              loading={loading}
              disabled={pristine || invalid}
              type="primary"
              htmlType="submit"
            >
              Sign up
            </Button>
          </div>
        </FormAntd>
      )}
    />
  );
};

export default withRouter(withApollo(SignUpUser));
