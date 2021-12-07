import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Formik, Field, Form } from 'formik';

import Title from '../Title/Title';
import { useHistory } from 'react-router-dom';
import { useLogin } from '../../loginContext';
import { User } from '../Register/Register';

import './Login.css';

enum loginStatus {
  Authenticated,
  Unauthenticated
}

const Login = () => {

  const [usersData, setUsersData] = useState<User[]>([]);
  const history = useHistory();
  const { loggedIn, setLoggedIn, setLoggedInUser } = useLogin();
  console.log("logged in is", loggedIn);

  useEffect(() => {
    const currentUsers = localStorage.getItem("users");
    let parsedUsers = currentUsers ? JSON.parse(currentUsers) : {};
    setUsersData(parsedUsers);
  }, [])

  const getUserStatus = (values: User) => {
    var authenticationState: loginStatus = loginStatus.Unauthenticated;
    usersData.map(user => {
      if (user.password === values.password && user.username === values.username) {
        authenticationState = loginStatus.Authenticated;
        setLoggedInUser(user);
      }
    })
    return authenticationState;
  }

  return (
    <div>
      <Title titleString='Login' />
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          image: ''
        }}

        onSubmit={async(
          values: User
        ) => {

          const userStatus = getUserStatus(values);
          if (userStatus !== loginStatus.Unauthenticated) {

            await axios.post('http://localhost:4001/api/user/login', {
              username: values.username,
              password: values.password
            })
              .then(function (response) {

                console.log(response);
                if (response.data.ok){
                  document.cookie = "JWT="+response.data.token;
                }

              })
              .catch(function (error) {
                console.log(error);
              });

            setLoggedIn(true);
            history.push("/dashboard");
          } else { alert("Incorrect username or password. Try again") }

        }}
      >
        <Form>
          <div className='field'>
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" placeholder="my_username" />
          </div>

          <div className='field'>
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="password" type="my_password" />
          </div>

          <div className='field'>
            <button className="btn btn-outline-dark" type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
export default Login;