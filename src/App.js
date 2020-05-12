import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const MyTextInput = (props) => {
  const { field, type } = props;

  return <input {...field} type={type} placeholder={field.name} />;
};

function App() {
  const [result, setResult] = useState("");
  return (
    <div>
      <h1>Show me the field values!</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setResult(JSON.stringify(values, null, 2));
          resetForm({});
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name='email' type='email' component={MyTextInput} />
            <ErrorMessage name='email' component='div' />
            <br />
            <Field type='password' name='password' component={MyTextInput} />
            <ErrorMessage name='password' component='div' />
            <br />
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <br/>
      <div className='result-field' style={{whiteSpace: 'pre'}}><code>{result}</code></div>
    </div>
  );
}

export default App;
