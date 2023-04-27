import { useState } from "react";
import { Link } from "react-router-dom";
import CrownLogo from "../../assets/crown.svg";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import FormInput from "../form-input/form-input.component";

import "../sign-in-form/sign-in-form.style.css";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signinWithFacebookPopup,
} from "../../utils/firebase/firebase.util.js";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <section className="form-container">
      <div className="form-box">
        <img src={CrownLogo} />
        <span>Enter your credentials to log in:</span>
        <form onSubmit={handleSubmit}>
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
          <div className="buttons-container">
            <button type="submit" className="sign-in">
              Sign In
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
          </div>
          <p>
            Don't have an account ?
            <Link className="nav-link" to="/sign-up">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignInForm;
