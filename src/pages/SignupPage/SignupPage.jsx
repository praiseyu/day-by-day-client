import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./SignupPage.scss";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
    setErrors({});

    let validationErrors = {};

    for (const key in formData) {
      if (!formData[key] || !formData[key].trim()) {
        validationErrors[key] = "This field is required.";
      }
    }

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
    } else {
      try {
        await axios.post(`${import.meta.env.VITE_LOCALHOST}/signup`, formData);
        alert("Succesfully signed up. Taking you to login page.");
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <main className="signup-pg">
      <h1 className="signup-pg__title">SIGN UP</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form__header">
          <h2 className="signup-form__title">Get Started Now</h2>
          <p className="signup-form__tagline">
            Create an account and start building your trip logs!
          </p>
        </div>
        <div className="signup-form__fields">
          <label className="signup-form__label">
            Name
            <input
              type="text"
              name="name"
              className={`signup-form__input ${
                errors.name ? "signup-form__input--error" : ""
              }`}
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            {errors.name ? <ErrorMessage message={errors.name} /> : null}
          </label>
          <label className="signup-form__label">
            Email Address
            <input
              type="text"
              name="email"
              className={`signup-form__input ${
                errors.email ? "signup-form__input--error" : ""
              }`}
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {errors.email ? <ErrorMessage message={errors.email} /> : null}
          </label>
          <label className="signup-form__label">
            Password
            <input
              type="password"
              name="password"
              className={`signup-form__input ${
                errors.password ? "signup-form__input--error" : ""
              }`}
              value={formData.password}
              placeholder="Enter a password"
              onChange={handleChange}
            />
            {errors.password ? (
              <ErrorMessage message={errors.password} />
            ) : null}
          </label>
          <div className="signup-form__btn-container">
            <button type="submit" className="signup-form__submit-cta">
              SIGN UP
            </button>
            <p className="signup-form__redirect">
              Already a member? Login{" "}
              <Link to="/login" className="signup-form__link">
                here.
              </Link>
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}
