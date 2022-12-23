import {
  createUserDocumentFromAuth,
  singInGoolgePopUp,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/singn-up-form/sign-up-form.component";
import { createUserWithEmailAndPassword1 } from "../../utils/firebase/firebase.utils";
const SignIn = () => {
  const logGoogleUser = async () => {
    //const response = await singInGoolgePopUp();
    //console.log(response);
    createUserDocumentFromAuth();
  };
  const submitFormData = async ({ email, password, displayName }) => {
    await createUserWithEmailAndPassword1({ email, password, displayName });
  };
  return (
    <div>
      <h2>Sign in page</h2>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <SignUpForm submitFromData={submitFormData} />
    </div>
  );
};
export default SignIn;
