import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signinWithFacebookPopup,
} from "../../utils/firebase/firebase.util";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const logFacebookUser = async () => {
    const { user } = await signinWithFacebookPopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={logGoogleUser}> sign google</button>
      <button onClick={logFacebookUser}> sign facebook</button>
    </div>
  );
};

export default SignIn;
