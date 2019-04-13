import React from 'react';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { Form as FormAntd, Icon, Input, Button } from 'antd';
import { Form, Field } from 'react-final-form';
import { TextField } from 'react-final-form-antd';

import { fieldNames, constraints } from './model';
import validator from 'utils/validator';

const validate = validator(constraints);

const SignUpUser = () => {
  const onSubmit = async values => {
    console.log(values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <FormAntd onSubmit={handleSubmit}>
          <Field name={fieldNames.email} component={TextField} />
          <Field name={fieldNames.password} component={TextField} type="password" />
          <div className="float-right">
            <Button
              disabled={pristine || invalid}
              type="primary"
              htmlType="submit"
              className="login-form-button"
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
