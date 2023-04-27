import { useState } from "react";
import { Link } from "react-router-dom";
import CrownLogo from "../../assets/crown.svg";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import FormInput from "../form-input/form-input.component";
import {
  creatAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signinWithFacebookPopup,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.util";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  const signInWithFacebook = async () => {
    const { user } = await signinWithFacebookPopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await creatAuthUserWithEmailAndPassword(email, password);
      resetFormFields();

      await createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <section className="form-container">
      <div className="form-box">
        <img src={CrownLogo} />
        <span>Enter your credentials to sign up:</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />

          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />

          <button type="submit" className="sign-in">
            Sign Up
          </button>
          <div className="button-social-icons">
            <p>Or sign in with:</p>
            <button type="button" onClick={signInWithGoogle}>
              <FaGoogle />
            </button>
            <button type="button" onClick={signInWithFacebook}>
              <FaFacebook />
            </button>
          </div>
          <p>
            Already have an account ?
            <Link className="nav-link" to="/sign-in">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
