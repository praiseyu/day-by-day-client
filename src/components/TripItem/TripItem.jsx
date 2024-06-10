import "./TripItem.scss";

export default function TripItem({ trip_name, start_date, end_date, onClick }) {
  return (
    <li className="trip" onClick={onClick}>
      <p className="trip__name">{trip_name}</p>
      <p className="trip__startDate" >{start_date.split("T")[0]}</p>
      <p className="trip__endDate">{end_date.split("T")[0]}</p>
    </li>
  );
}
