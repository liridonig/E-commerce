import React from "react";

const FormInput = ({ label, ...otherProps }) => {
  //   const { label } = c;
  return (
    <>
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}

      <input className="form-input" {...otherProps} />
    </>
  );
};

export default FormInput;
