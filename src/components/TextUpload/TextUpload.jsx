import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import axios from "axios";
import "./TextUpload.scss";

export default function TextUpload({ getTextItems }) {
  const [newText, setNewText] = useState("");
  const [errors, setErrors] = useState(false);
  const { entryDate, tripId } = useParams();
  const user = useAuth();
  const { authUser } = user;
  const token = user.token;

  const uploadText = async () => {
    const textUploadPromise = axios.post(
      `${import.meta.env.VITE_LOCALHOST}/api/${tripId}/${entryDate}/text`,
      {
        description: newText,
        user_id: authUser.user_id,
        entry_date: entryDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.promise(textUploadPromise, {
      loading: "Uploading text...",
      success: () => {
        getTextItems();
        setNewText("");
        return "Text successfully uploaded.";
      },
      error: "Error uploading text.",
    });
  };

  const handleChange = (e) => {
    setNewText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(false);
    if (newText.trim() === "") {
      setErrors(true);
      return;
    }
    uploadText();
  };

  return (
    <section className="text-upload">
      <h2 className="text-upload__title">Upload Text</h2>
      <form className="text-upload__form" onSubmit={handleSubmit}>
        <label className="text-upload__label">
          Enter a text block:
          <textarea
            name="description"
            value={newText}
            onChange={handleChange}
            placeholder="What would you like to say?"
            className={
              errors
                ? " text-upload__input text-upload__input--error"
                : "text-upload__input"
            }
          />
          {errors ? <ErrorMessage message="This field is required." /> : null}
        </label>
        <button className="text-upload__submit-btn">Add Text</button>
      </form>
    </section>
  );
}
