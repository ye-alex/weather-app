import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EMAIL, PASSWORD } from '../../constant';
import { validateFields } from '../../validator';

// Mocked credentials
const mockEmail = 'test@test.com';
const mockPassword = 'Test1234';

const Login = ({ setIsLoggedIn }) => {
  const initialErrors = { email: [], password: [], creds: [] };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(initialErrors);

  const isEmailError = !!errors.email.length;
  const isPasswordError = !!errors.password.length;
  const isCredsError = !!errors.creds.length;

  const onChange = (name, event) => {
    const { value } = event.target;

    // eslint-disable-next-line
    switch (name) {
      case EMAIL:
        setEmail(value);
        setErrors({
          ...errors,
          email: [],
        });
        break;
      case PASSWORD:
        setPassword(value);
        setErrors({
          ...errors,
          password: [],
        });
        break;
    }
  };

  const onBlur = (name, value) => {
    const error = validateFields(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const onSubmit = event => {
    event.preventDefault();

    if (!isPasswordError && !isEmailError) {
      if (email === mockEmail && password === mockPassword) {
        setIsLoggedIn(true);
      } else {
        setErrors({
          ...errors,
          creds: ['Invalid creds'],
        });
      }
    }
  };

  const onClear = event => {
    event.preventDefault();

    setErrors(initialErrors);
    setPassword('');
    setEmail('');
  };

  return (
    <div className='login'>
      <header className='app-header'>
        <h2>Log In</h2>
      </header>
      <div>
        {isCredsError && <p className="creds-error">{errors.creds}</p>}
        <form action='' onSubmit={onSubmit}>
          <fieldset
            className={`form-fields ${
              isEmailError || isCredsError ? 'error' : ''
            }`}
          >
            <label htmlFor={EMAIL}>Email</label>
            <input
              type='text'
              name={EMAIL}
              placeholder={EMAIL}
              value={email}
              onChange={event => onChange(EMAIL, event)}
              onBlur={() => onBlur(EMAIL, email)}
              id={EMAIL}
            />
            <span>{errors.email}</span>
          </fieldset>
          <fieldset
            className={`form-fields ${
              isPasswordError || isCredsError ? 'error' : ''
            }`}
          >
            <label htmlFor={PASSWORD}>Password</label>
            <input
              type={PASSWORD}
              name={PASSWORD}
              placeholder={PASSWORD}
              onChange={event => onChange(PASSWORD, event)}
              onBlur={() => onBlur(PASSWORD, password)}
              value={password}
              id={PASSWORD}
            />
            <span>{errors.password}</span>
          </fieldset>
          <div className='form-buttons'>
            <button disabled={!email && !password}>Submit</button>
            <button onClick={onClear}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
