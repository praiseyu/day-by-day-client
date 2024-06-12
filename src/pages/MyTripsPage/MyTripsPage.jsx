import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import TripItem from "../../components/TripItem/TripItem";
import "./MyTripsPage.scss";

export default function MyTripsPage() {
  const navigate = useNavigate();
  const user = useAuth();
  const { authUser } = user;
  const token = user.token;
  const [trips, setTrips] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    trip_name: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    async function getTrips() {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/trips`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrips(response.data);
    }
    try {
      getTrips();
    } catch (err) {
      console.error(err);
    }
  }, [token]);

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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_LOCALHOST}/api/trips`,
          {
            user_id: authUser.user_id,
            ...formData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTrips((prevTrips) => [...prevTrips, ...response.data]);
        toast.success("Trip has been added.")
      } catch (err) {
        console.error(err);
      }
    }

    setFormData({
      trip_name: "",
      start_date: "",
      end_date: "",
    });
  };

  function onNavigateTo(tripId) {
    navigate(`/mytrips/${tripId}`);
  }

  if (!trips) {
    return <div></div>
  }

  return (
    <main className="dashboard">
      {authUser ? (<h2 className="dashboard__welcome-text">Welcome Back, {authUser.name}</h2>): <h2 className="dashboard__welcome-text">Welcome Back</h2>}
      <h1 className="dashboard__title">My Trips</h1>
      <ul className="trip-list">
        <li className="trip-list__heading">
          <h3 className="trip-list__heading-name">Trip Name</h3>
          <h3 className="trip-list__heading-startDate">Start Date</h3>
          <h3 className="trip-list__heading-endDate">End Date</h3>
        </li>
        {trips.length > 0 ? 
      trips.map((trip) => (
        <TripItem
          key={trip.trip_id}
          trip_name={trip.trip_name}
          start_date={trip.start_date}
          end_date={trip.end_date}
          onClick={() => onNavigateTo(trip.trip_id)}
        />
      ))  : 
      <p className = "trip-list__empty-list-msg">No trips here. Add a trip below to continue!</p>
      }
      </ul>

      <form className="trip-form" onSubmit={handleSubmit}>
        <h2 className="trip-form__title">Add New Trip</h2>
        <div className="trip-form__fields">
          <label className="trip-form__label">
            Trip Name
            <input
              type="text"
              name="trip_name"
              value={formData.trip_name}
              placeholder="Enter trip name"
              onChange={handleChange}
              className={`trip-form__input ${
                errors.trip_name ? "trip-form__input--error" : ""
              }`}
            />
            {errors.trip_name ? (
              <ErrorMessage message={errors.trip_name} />
            ) : null}
          </label>
          <label className="trip-form__label">
            Start Date
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className={`trip-form__input ${
                errors.start_date ? "trip-form__input--error" : ""
              }`}
            />
            {errors.start_date ? (
              <ErrorMessage message={errors.start_date} />
            ) : null}
          </label>
          <label className="trip-form__label">
            End Date
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className={`trip-form__input ${
                errors.end_date ? "trip-form__input--error" : ""
              }`}
            />
            {errors.end_date ? (
              <ErrorMessage message={errors.end_date} />
            ) : null}
          </label>
        </div>
        <button type="submit" className="trip-form__submit-btn">
          ADD TRIP
        </button>
      </form>
    </main>
  );
}
