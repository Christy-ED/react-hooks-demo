// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '../context/ThemeContext';

function UserForm({ user, updateUser }) {
  const { themeStyles } = useTheme();
  const [firstName, setFirstName] = useState(user.name.first);
  const [lastName, setLastName] = useState(user.name.last);
  const [imagePreview, setImagePreview] = useState(user.picture.large);

  // Update form values when the selected user changes
  useEffect(() => {
    setFirstName(user.name.first);
    setLastName(user.name.last);
    setImagePreview(user.picture.large);
    formik.setFieldValue('email', user.email); // Reset Formik's email field
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: user.email,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      const updatedUser = {
        ...user,
        name: { ...user.name, first: firstName, last: lastName },
        email: values.email,
        picture: { large: imagePreview },
      };
      updateUser(updatedUser);
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div style={{ marginTop: "20px", color: themeStyles.color }}>
      <h3>Edit User</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <img
            src={imagePreview}
            alt={`${firstName} ${lastName}`}
            style={{ borderRadius: "50%", width: "80px", height: "80px", marginBottom: "10px" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "block", marginBottom: "10px" }}
          />
        </div>

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="inputField"
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="inputField"
        />

        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Email"
          className="inputField"
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red", marginBottom: "10px" }}>{formik.errors.email}</div>
        ) : null}

        <button type="submit" className="button">
          Save
        </button>
      </form>
    </div>
  );
}

export default UserForm;
