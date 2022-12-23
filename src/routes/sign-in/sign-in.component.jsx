import {
  createUserDocumentFromAuth,
  singInGoolgePopUp,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    //const response = await singInGoolgePopUp();
    //console.log(response);
    createUserDocumentFromAuth();
  };
  return (
    <div>
      <h2>Sign in page</h2>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
};
export default SignIn;
