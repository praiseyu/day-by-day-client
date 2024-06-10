import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import backBtn from "../../assets/icons/arrow-back-24.svg";
import DeleteTripModal from "../../components/DeleteTripModal/DeleteTripModal";
import "./TripDetailsPage.scss";

export default function TripDetailsPage() {
  const [tripDetails, setTripDetails] = useState(null);
  const [entryDetails, setEntryDetails] = useState(null);
  const [tripDateRange, setTripDateRange] = useState([]);
  const [entryStatusMap, setEntryStatusMap] = useState({});
  const { tripId } = useParams();
  const navigate = useNavigate();
  const user = useAuth();
  const { token } = user;
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (tripId && token) {
      fetchTripAndEntries();
    }
  }, [tripId, token]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  async function fetchTripAndEntries() {
    try {
      const tripResponse = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/trips/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTripDetails(tripResponse.data);

      const entryResponse = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/entries/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEntryDetails(entryResponse.data);
    } catch (error) {
      console.error("Error fetching trip and entries:", error);
    }
  }

  useEffect(() => {
    if (tripDetails && entryDetails) {
      const newDateRange = createDates(
        tripDetails.start_date,
        tripDetails.end_date
      );
      setTripDateRange(newDateRange);

      const newStatusMap = entryDetails.reduce((acc, entry) => {
        acc[entry.entry_date.split("T")[0]] = entry.status;
        return acc;
      }, {});
      setEntryStatusMap(newStatusMap);
    }
  }, [tripDetails, entryDetails]);

  const createDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];

    while (start <= end) {
      dateArray.push(new Date(start).toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }
    return dateArray;
  };

  function navigateToAddEntry(entryDate) {
    navigate(`/mytrips/${tripId}/${entryDate}/add`, {
      state: { tripName: tripDetails.trip_name },
    });
  }

  function navigateToViewEntry(entryDate) {
    navigate(`/mytrips/${tripId}/${entryDate}/view`, {
      state: { tripName: tripDetails.trip_name },
    });
  }

  if (!tripDetails || !entryDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DeleteTripModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        tripId={tripId}
        token={token}
      />
      <div className="trip-entries__header">
        <div className="trip-entries__return-my-trips">
          <Link to="/mytrips">
            <img
              src={backBtn}
              alt="left-pointing-arrow"
              className="trip-entries__arrow-icon"
            />
          </Link>
          <h3 className="trip-entries__mytrips">MY TRIPS</h3>
        </div>
        <div className="trip-entries__header-titles">
          <h1 className="trip-entries__title">{tripDetails.trip_name}</h1>
          <h2>Entries</h2>
        </div>
        <div className="trip-entries__header-delete">
          <button className="trip-entries__delete-btn" onClick={openModal}>
            Delete Trip
          </button>
        </div>
        <div className="trip-entries__heading-dates">
          <h2>Start Date: {tripDetails.start_date.split("T")[0]}</h2>
          <h2>End Date: {tripDetails.end_date.split("T")[0]}</h2>
        </div>
      </div>

      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__column-heading">Entry Date</th>
            <th className="table__column-heading">Entry Added?</th>
            <th className="table__column-heading">Add/Edit Entry</th>
          </tr>
        </thead>
        <tbody>
          {tripDateRange.map((date) => (
            <tr key={date} className="table__row">
              <td className="table__cell">{date}</td>
              <td className="table__cell">
                {entryStatusMap[date] ? (
                  <p className="table__status--yes">YES</p>
                ) : (
                  <p className="table__status--no">NO</p>
                )}
              </td>
              <td className="table__cell">
                {entryStatusMap[date] ? (
                  <button
                    className="table__view-entry-btn"
                    onClick={() => navigateToViewEntry(date)}
                  >
                    Edit Entry
                  </button>
                ) : (
                  <button
                    onClick={() => navigateToAddEntry(date)}
                    className="table__add-entry-btn"
                  >
                    Add Entry
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
