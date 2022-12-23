import { async } from "q";
import { useState } from "react";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmedPassword: "",
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
    <div>
      <h1>Sign up with your email and password</h1>
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
        <label>Dispaly Name</label>
        <input
          onChange={handleChange}
          name="displayName"
          value={displayName}
          type="text"
          required
        ></input>
        <label>Email</label>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        ></input>
        <label>Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        ></input>
        <label>Confirm Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
