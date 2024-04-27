import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/account/login', values);

        const { user, token, message } = res.data;

        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token.access);

        console.log(message);
        setSubmitting(false);
        navigate('/');
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          setFieldError('password', 'Invalid credentials. Please try again.');
        } else {
          console.error('An unexpected error occurred:', error.message);
          setFieldError('password', 'An unexpected error occurred. Please try again later.');
        }
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
