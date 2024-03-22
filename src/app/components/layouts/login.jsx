import { useParams } from "react-router-dom";
import { LoginForm } from "../ui/loginForm";
import { useState } from "react";
import { RegisterForm } from "../ui/registerForm";

export const Login = () => {
  const { type } = useParams();

  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleForm = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>
                Already have an account?{" "}
                <a role="button" onClick={toggleForm}>
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                Dont have an account?{" "}
                <a role="button" onClick={toggleForm}>
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
