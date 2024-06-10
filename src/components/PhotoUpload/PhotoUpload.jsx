import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import uploadIcon from "../../assets/icons/upload-cloud-24.svg";
import "./PhotoUpload.scss";

export default function PhotoUpload({ getPhotos }) {
  const [dataURL, setDataURL] = useState(null);
  const [uploadedURL, setUploadedURL] = useState(null);
  const { entryDate, tripId } = useParams();
  const user = useAuth();
  const token = user.token;
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading aborted");
      reader.onerror = () => console.log("file reading has error");
      reader.onload = () => {
        const binaryStr = reader.result;
        setDataURL(binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, acceptedFiles, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const selectedFile = acceptedFiles[0];

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("image", selectedFile);

    const uploadPromise = axios.post(
      `${import.meta.env.VITE_LOCALHOST}/api/${tripId}/${entryDate}/photos`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.promise(uploadPromise, {
      loading: "Uploading photo...",
      success: (response) => {
        setUploadedURL(response.data.url);
        getPhotos();
        return "Photo successfully uploaded.";
      },
      error: "Error uploading photo.",
    });
  };

  const handleURLClear = () => {
    setDataURL(null);
    setUploadedURL(null);
  };

  return (
    <>
      <section className="upload">
        <h2 className="upload__title">Upload Photos</h2>
        <div className="upload-zone">
          {dataURL ? (
            <>
              <div className="upload__preview">
                <img
                  src={dataURL}
                  alt="preview-img"
                  className="upload__preview-img"
                />
              </div>
            </>
          ) : (
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="dropzone__drag-file">
                  <img src={uploadIcon} className="dropzone__upload-img" />
                </div>
              ) : (
                <p className="dropzone__display-text">
                  Drop your files here or click to browse.
                </p>
              )}
            </div>
          )}
        </div>

        {dataURL ? (
          <div className="action-btns">
            {uploadedURL ? (
              <button
                onClick={handleURLClear}
                className="action-btns__new-upload-btn"
              >
                New Upload
              </button>
            ) : (
              <button
                onClick={handleURLClear}
                className="action-btns__cancel-btn"
              >
                Cancel
              </button>
            )}
            {uploadedURL ? (
              <button className="action-btns__uploaded-msg" disabled>
                Uploaded!
              </button>
            ) : (
              <button onClick={uploadImage} className="action-btns__upload-btn">
                Upload
              </button>
            )}
          </div>
        ) : null}
      </section>
    </>
  );
}
