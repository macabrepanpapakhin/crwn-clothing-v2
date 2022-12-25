import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import Button from "../button/button.component";
const SignInFormComponent = ({ handleSubmit }) => {
  const defaultFormFields = { email: "", password: "" };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const middle = (event) => {
    event.preventDefault();
    console.log(formFields);
    handleSubmit(formFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={middle}>
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

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignInFormComponent;
