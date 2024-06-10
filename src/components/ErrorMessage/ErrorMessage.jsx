import errorIcon from "../../assets/icons/error-icon.svg";
import "./ErrorMessage.scss";

export default function ErrorMessage({message}) {
  return (
    <span className="error">
      <img 
        src={errorIcon}
        alt="exclamation mark in circle"
        className="error__icon"
      />
      {message}
    </span>
  )
}
