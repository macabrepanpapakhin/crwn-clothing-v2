import FormInput from "../form-input/form-input.component";
import { useContext, useState } from "react";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";

import { UserContext } from "../../contexts/users.context";
const SignInFormComponent = ({ handleSubmit }) => {
  console.log("sign in hit");
  const defaultFormFields = { email: "", password: "" };
  //const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const middle = async (event) => {
    event.preventDefault();
    const user = await handleSubmit(formFields);
    console.log("in sign in");
    console.log(user);
    // setCurrentUser(user);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={middle} method="POST">
        <FormInput
          label="email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <Button buttonType={BUTTON_TYPES_CLASSES.google} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignInFormComponent;
