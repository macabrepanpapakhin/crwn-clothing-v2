import { useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sing-up-form.styles.scss";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = ({ submitFromData }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (password !== confirmPassword) {
            alert("unmatched password");
            return;
          }

          await submitFromData(formFields);
          resetFormFields();
        }}
      >
        <FormInput
          label="Display Name"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          type="text"
          required
        ></FormInput>

        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        ></FormInput>

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        ></FormInput>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
