import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Modal from "react-modal";
import axios from "axios";
import "./DeleteTripModal.scss";

Modal.setAppElement("#root");

export default function DeleteTripModal({ isOpen, closeModal, token, tripId }) {
  const navigate = useNavigate();

  const confirmDelete = async () => {
    const deleteTripPromise = axios.delete(
      `${import.meta.env.VITE_LOCALHOST}/api/trips/${tripId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // data: {
        //   trip_id: tripId,
        // },
      }
    );

    toast.promise(deleteTripPromise, {
      loading: "Deleting trip...",
      success: () => {
        closeModal();
        setTimeout(() => {
          navigate("/mytrips");
        }, 2000);
        return "Trip deleted successfully.";
      },
      error: (err) => {
        console.error(`Could not delete the trip: ${err}.`);
        return "There was an error deleting this trip.";
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Confrim Delete Modal"
      className="delete-trip-modal"
      overlayClassName="delete-trip-modal__overlay"
    >
      <h2 className="delete-trip-modal__title">Confirm Delete</h2>
      <p className="delete-trip-modal__text">
        Are you sure you want to delete this trip?
      </p>
      <div className="delete-trip-modal__buttons">
        <button onClick={closeModal} className="delete-trip-modal__cancel-btn">
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="delete-trip-modal__delete-btn"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
