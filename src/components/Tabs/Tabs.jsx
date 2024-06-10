import { useState } from "react";
import PhotoUpload from "../PhotoUpload/PhotoUpload";
import TextUpload from "../TextUpload/TextUpload";
import DesignContent from "../DesignContent/DesignContent";
import PhotoDisplay from "../PhotoDisplay/PhotoDisplay";
import "./Tabs.scss";

export default function Tabs({
  photoItems,
  setPhotoItems,
  getPhotos,
  getTextItems,
  textColor,
  setTextColor,
  borderColor,
  setBorderColor,
  borderWidth,
  setBorderWidth,
}) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__tabs-wrapper">
        <div
          className={toggleState === 1 ? "tabs active-tab" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <h2 className="sidebar__tab-title">Photos</h2>
        </div>
        <div
          className={toggleState === 2 ? "tabs active-tab" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <h2 className="sidebar__tab-title">Text</h2>
        </div>
        <div
          className={toggleState === 3 ? "tabs active-tab" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          <h2 className="sidebar__tab-title">Design</h2>
        </div>
      </div>
      <div className="content-container">
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <PhotoUpload getPhotos={getPhotos} />
          <PhotoDisplay photoItems={photoItems} setPhotoItems={setPhotoItems} />
        </div>
        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <TextUpload getTextItems={getTextItems} />
        </div>
        <div
          className={toggleState === 3 ? "content active-content" : "content"}
        >
          <DesignContent
            textColor={textColor}
            setTextColor={setTextColor}
            borderColor={borderColor}
            setBorderColor={setBorderColor}
            borderWidth={borderWidth}
            setBorderWidth={setBorderWidth}
          />
        </div>
      </div>
    </div>
  );
}
