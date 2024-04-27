import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const BlogPostForm = ({ initialValues, onSubmit }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Create/Update Post</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="content" component="div" className="text-red-500" />
          </div>


          <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BlogPostForm;
