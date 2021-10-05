import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Checkbox, Input } from 'antd';
import * as Yup from 'yup';
import './styles.scss';
const CustomField = ({ name, type, label }) => {
  return (
    <div className="form__control">
      <label htmlFor="title">{label}</label>
      <Field
        name={name}
        render={({ field }) => <Input {...field} type={type} className="form__control--input" />}
      />
      <div className="text-danger">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default CustomField;
