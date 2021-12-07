import React from "react";
import { Formik, Field, Form, FormikHelpers } from 'formik';

import Title from '../Title/Title';
import { useHistory } from 'react-router-dom';
import { useLogin } from '../../loginContext';

import './Register.css';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  image: string; 
}

function validateString(value:any) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}

const Register = () => {
  let history = useHistory();
  const {setUserBeingRegistered} = useLogin();
  return (
    <div>
      <Title titleString='Register for free!' />
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          image: ''
        }}
        onSubmit={(
          values: User,
          { setSubmitting }: FormikHelpers<User>
        ) => {
          const currentUsers = localStorage.getItem("users");
          let parsedUsers = currentUsers ? JSON.parse(currentUsers) : {};
          if (Array.isArray(parsedUsers)) { parsedUsers.push(values);}
          localStorage.setItem("users", JSON.stringify(parsedUsers));
          setUserBeingRegistered({username: values.username, password: values.password});
          history.push('/fileUpload')
        }}
      >
        {({ errors, touched, isValidating }) => (
         <Form>

          <div className='field'>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="John" validate={validateString}/>
            {errors.firstName && touched.firstName && <div className="error">{errors.firstName}</div>}
          </div>

          <div className='field'>
            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Smith" validate={validateString}/>
            {errors.lastName && touched.lastName && <div className="error">{errors.lastName}</div>}
          </div>

          <div className='field'>
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" placeholder="my_username" validate={validateString}/>
            {errors.username && touched.username && <div className="error">{errors.username}</div>}
          </div>

          <div className='field'>
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="my_password" validate={validateString}/>
            {errors.password && touched.password && <div className="error">{errors.password}</div>}
          </div>
 
          <div className='field'>
            <button className="btn btn-outline-dark" type="submit">OK</button>
          </div>
         </Form>
       )}

      </Formik>
    </div>
  );
}
export default Register;