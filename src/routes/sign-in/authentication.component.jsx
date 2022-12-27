import {
  createUserDocumentFromAuth,
  signInWithEmailAndPass,
  singInGoolgePopUp,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/singn-up-form/sign-up-form.component";
import { createUserWithEmailAndPassword1 } from "../../utils/firebase/firebase.utils";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";

const SignIn = () => {
  const logGoogleUser = async () => {
    //const response = await singInGoolgePopUp();
    //console.log(response);
    createUserDocumentFromAuth();
  };
  const submitFormData = async ({ email, password, displayName }) => {
    return await createUserWithEmailAndPassword1({
      email,
      password,
      displayName,
    });
  };
  const handleSubmit = async ({ email, password }) => {
    const user = await signInWithEmailAndPass({ email, password });
    return user;
  };
  return (
    <div className="authentication-container">
      <SignUpForm submitFromData={submitFormData} />
      <SignInForm handleSubmit={handleSubmit} />
    </div>
  );
};
export default SignIn;
