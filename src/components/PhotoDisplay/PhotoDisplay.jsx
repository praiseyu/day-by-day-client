import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./PhotoDisplay.scss";

export default function PhotoDisplay({ photoItems, setPhotoItems }) {
  const { entryDate, tripId } = useParams();
  const user = useAuth();
  const token = user.token;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openModal = (public_id) => {
    setDeleteTarget(public_id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setDeleteTarget(null);
    setIsOpen(false);
  };

  const handleDelete = (public_id) => {
    const filteredPhotos = photoItems.filter(
      (photo) => photo.public_id !== public_id
    );
    setPhotoItems(filteredPhotos);
    closeModal();
  };

  return (
    <section className="photo-grid">
      <h4 className="photo-grid__title">Today&apos;s Photos</h4>
      <div className="photo-grid__gallery">
        {photoItems.map((photo) => (
          <div className="photo-grid__card" key={photo.public_id}>
            <img
              src={photo.photo_path}
              onClick={() => openModal(photo.public_id)}
              data-uid={photo.public_id}
              className="photo-grid__photo"
            />
          </div>
        ))}
        <DeleteModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          deleteTarget={deleteTarget}
          handleDelete={handleDelete}
          entryDate={entryDate}
          token={token}
          tripId={tripId}
        />
      </div>
    </section>
  );
}
