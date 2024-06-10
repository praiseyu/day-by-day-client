import Modal from "react-modal";
import { toast } from "sonner";
import axios from "axios";
import "./DeleteModal.scss";

Modal.setAppElement("#root");

export default function DeleteModal({
  isOpen,
  closeModal,
  deleteTarget,
  handleDelete,
  entryDate,
  token,
}) {
  const confirmDelete = async () => {
    const deletePhotoPromise = axios.delete(
      `${import.meta.env.VITE_LOCALHOST}/api/${entryDate}/photos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          public_id: deleteTarget,
        },
      }
    );

    toast.promise(deletePhotoPromise, {
      loading: "Deleting photo...",
      success: () => {
        handleDelete(deleteTarget);
        closeModal();
        return "Photo deleted successfully.";
      },
      error: (err) => {
        console.error(`Could not delete the photo: ${err}.`);
        return "There was an error deleting this photo.";
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Confirm Delete Modal"
      className="delete-modal"
      overlayClassName="delete-modal__overlay"
    >
      <h2 className="delete-modal__title">Confirm Delete</h2>
      <p className="delete-modal__text">
        Are you sure you want to delete this item?
      </p>
      <div className="delete-modal__buttons">
        <button onClick={closeModal} className="delete-modal__cancel-btn">
          Cancel
        </button>
        <button onClick={confirmDelete} className="delete-modal__delete-btn">
          Delete
        </button>
      </div>
    </Modal>
  );
}
