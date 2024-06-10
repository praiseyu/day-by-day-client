import { useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./EntryLayout.scss";

export default function EntryLayout({
  photoItems,
  textItems,
  layout,
  setLayout,
  textColor,
  borderColor,
  borderWidth,
}) {
  const borderStyle = {
    border: borderColor ? `${borderWidth}px solid ${borderColor}` : "none",
  };

  useEffect(() => {
    if (!layout || layout.length === 0) {
      const initialLayout = generateLayout(
        photoItems.length + textItems.length
      );
      onLayoutChange(initialLayout);
    }
    setLayout(layout);
  }, [photoItems, textItems]);

  const generateLayout = (items) => {
    return Array.from({ length: items }).map((_, i) => ({
      x: (i * 2) % 12,
      y: Math.floor(i / 6) * (Math.ceil(Math.random() * 4) + 1),
      w: 2,
      h: Math.ceil(Math.random() * 4) + 1,
      i: i.toString(),
    }));
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className="entry">
      <GridLayout
        className="entry__layout"
        cols={12}
        rowHeight={30}
        width={900}
        layout={layout}
        onLayoutChange={onLayoutChange}
        compactType={null}
      >
        {photoItems &&
          photoItems.map((image) => (
            <div
              key={`photo-${image.photo_id}`}
              data-uid={image.photo_id}
              className="entry__item-container"
            >
              <img
                src={image.photo_path}
                style={{ ...borderStyle, width: "100%", height: "100%" }}
                className="entry__image"
              />
            </div>
          ))}
        {textItems &&
          textItems.map((item) => (
            <div
              key={`text-${item.text_id}`}
              className="entry__text-block"
              style={{ color: textColor }}
            >
              <p className="entry__text">{item.description}</p>
            </div>
          ))}
        {!photoItems && (
          <div className="entry__empty-message">Upload photos to continue.</div>
        )}
        {!textItems && (
          <div className="entry__empty-message">Add text to continue.</div>
        )}
      </GridLayout>
      <div className="entry__vertical-line"></div>
    </div>
  );
}
