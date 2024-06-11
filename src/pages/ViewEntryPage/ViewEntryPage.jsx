import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import Tabs from "../../components/Tabs/Tabs";
import EntryLayout from "../../components/EntryLayout/EntryLayout";
import "./ViewEntryPage.scss";

export default function ViewEntryPage() {
  const { tripId, entryDate } = useParams();
  const [photoItems, setPhotoItems] = useState([]);
  const [textItems, setTextItems] = useState([]);
  const [textColor, setTextColor] = useState("#352F36");
  const [borderColor, setBorderColor] = useState("#352F36");
  const [borderWidth, setBorderWidth] = useState(0);
  const [layout, setLayout] = useState([]);
  const user = useAuth();
  const token = user.token;
  const { state } = useLocation();
  const { tripName } = state;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await getEntriesLayout();
    await getPhotos();
    await getTextItems();
  }

  async function getEntriesLayout() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/entries/${tripId}/${entryDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 404) {
        setLayout([]);
      }
      setLayout(response.data.layout);
      setBorderWidth(response.data.border_width);
      setBorderColor(response.data.border_color);
      setTextColor(response.data.text_color);
    } catch (err) {
      console.error(`Error getting entry layout details: ${err}.`);
    }
  }

  async function getPhotos() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/${tripId}/${entryDate}/photos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setPhotoItems(response.data);
      } else if (response.status === 404) {
        console.log("line 73");
      }
    } catch (err) {
      console.error(`Error getting photos: ${err}.`);
    }
  }
  async function getTextItems() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/${tripId}/${entryDate}/text`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTextItems(response.data);
    } catch (err) {
      console.error(`Error getting text blocks: ${err}.`);
    }
  }

  const onSaveEditEntry = async () => {
    const entryData = {
      layout: JSON.stringify(layout),
      status: true,
      border_color: borderColor,
      border_width: borderWidth,
      text_color: textColor,
    };

    const saveEditEntryPromise = axios.put(
      `${import.meta.env.VITE_LOCALHOST}/api/entries/${tripId}/${entryDate}`,
      entryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.promise(saveEditEntryPromise, {
      loading: "Saving entry...",
      success: () => {
        setTimeout(() => {
          navigate(`/mytrips/${tripId}`);
        }, 3000);
        return "Successfully saved entry.";
      },
      error: (err) => {
        console.error(`Could not save this entry: ${err}.`);
        return "There was an error saving this entry.";
      },
    });
  };

  if (!layout) {
    return <div>Loading...</div>;
  }

  return (
    <main className="edit-entry">
      <div className="edit-entry__heading">
        <h1 className="edit-entry__title">ENTRY FOR: {entryDate}</h1>
        <p className="edit-entry__tagline">Trip Name: {tripName} </p>
      </div>
      <section className="entry">
        <Tabs
          photoItems={photoItems}
          setPhotoItems={setPhotoItems}
          getPhotos={getPhotos}
          getTextItems={getTextItems}
          textColor={textColor}
          setTextColor={setTextColor}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
          borderWidth={borderWidth}
          setBorderWidth={setBorderWidth}
        />
        <EntryLayout
          photoItems={photoItems}
          textItems={textItems}
          layout={layout}
          setLayout={setLayout}
          textColor={textColor}
          borderColor={borderColor}
          borderWidth={borderWidth}
        />
      </section>
      <div className="edit-entry__btns-wrapper">
        <Link to={`/mytrips/${tripId}`} className="edit-entry__cancel-btn">
          CANCEL
        </Link>
        <button onClick={onSaveEditEntry} className="edit-entry__save-btn">
          SAVE ENTRY
        </button>
      </div>
    </main>
  );
}
