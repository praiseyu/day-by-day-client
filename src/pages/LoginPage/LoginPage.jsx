import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./LoginPage.scss";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Email address required. Needs an @.";
    }

    if (formData["password"].length < 8) {
      validationErrors["password"] =
        "Enter a password with at least 8 characters.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/login`,
        formData
      );
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setFormData({
        email: "",
        password: "",
      });
      navigate("/mytrips");
    } catch (err) {
      console.error(`There was an error logging in: ${err}.`);
    }
  };

  return (
    <main className="login-pg">
      <h1 className="login-pg__title">LOGIN</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__header-wrapper">
          <h2 className="login-form__title">You&apos;re Back!</h2>
          <p>Can&apos;t wait to hear about your adventures.</p>
        </div>

        <div className="login-form__fields">
          <label className="login-form__label">
            Email Address
            <input
              type="text"
              name="email"
              className={`login-form__input ${
                errors.email ? "login-form__input--error" : ""
              }`}
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {errors.email ? <ErrorMessage message={errors.email} /> : null}
          </label>
          <label className="login-form__label">
            Password
            <input
              type="password"
              name="password"
              className={`login-form__input ${
                errors.password ? "login-form__input--error" : ""
              }`}
              value={formData.password}
              placeholder="Enter a password"
              onChange={handleChange}
            />
            {errors.password ? (
              <ErrorMessage message={errors.password} />
            ) : null}
          </label>
          <div className="login-form__btn-container">
            <button type="submit" className="login-form__submit-cta">
              LOGIN
            </button>
            <p className="login-form__redirect">
              Not a member? Sign up{" "}
              <Link to="/signup" className="login-form__link">
                here.
              </Link>
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}
