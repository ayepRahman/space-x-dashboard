import React from 'react';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Form as FormAntd, Icon, Input, Button } from 'antd';
import { Form, Field } from 'react-final-form';
import { SIGN_UP_USER } from './gql';
import { fieldNames, constraints } from './model';
import validator from 'utils/validator';

const validate = validator(constraints);

const SignUpUser = ({ history, client, ...others }) => {
  const onSubmit = async values => {
    console.log(values);

    try {
      const response = await client.mutate({
        muatation: SIGN_UP_USER,
        variables: {
          email: '',
          password: '',
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error.message);
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
                validateStatus={!!meta.touched && !!meta.error && 'error'}
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
                validateStatus={!!meta.touched && !!meta.error && 'error'}
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
            <Button disabled={pristine || invalid} type="primary" htmlType="submit">
              Sign up
            </Button>
          </div>
        </FormAntd>
      )}
    />
  );
};

export default withRouter(withApollo(SignUpUser));
