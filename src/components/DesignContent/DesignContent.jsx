import { PopoverPicker } from "../PopoverPicker/PopoverPicker";
import "./DesignContent.scss";

export default function DesignContent({
  textColor,
  setTextColor,
  borderColor,
  setBorderColor,
  borderWidth,
  setBorderWidth,
}) {

  function handleWidthChange(e) {
    setBorderWidth(e.target.value);
  }

  return (
    <section className="design">
      <h2 className="design__title">Design Elements</h2>
      <div className="design__content">
        <div className="design__text">
          <h3 className="design__category-title">Text</h3>
          <div>
            <p>Choose a text colour: </p>
            <PopoverPicker color={textColor} onChange={setTextColor} />
            {textColor === "#352F36" ? null : (
              <button
                className="design__tcolor-reset-btn"
                onClick={() => setTextColor("#352F36")}
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <div className="design__photo">
          <h3 className="design__category-title">Photo Borders</h3>
          <div className="design__photo-color">
            <p>Choose a colour:</p>
            <PopoverPicker color={borderColor} onChange={setBorderColor} />
            {borderColor === "#352F36" ? null : (
              <button
                className="design__bcolor-reset-btn"
                onClick={() => setBorderColor("#352F36")}
              >
                Reset
              </button>
            )}
          </div>
          <label className="design__border-label">
            <h4>Border Width</h4>
            <div>
              <input
                type="range"
                value={borderWidth}
                onChange={handleWidthChange}
                min="0"
                max="10"
                step="1"
                list="values"
                className="design__border-width"
              />
              <datalist id="values">
                <option value="0" label="0"></option>
                <option value="2" label="2"></option>
                <option value="4" label="4"></option>
                <option value="6" label="6"></option>
                <option value="8" label="8"></option>
                <option value="10" label="10"></option>
              </datalist>
            </div>
            {borderWidth === 0 ? null : (
              <button
                className="design__bwidth-reset-btn"
                onClick={() => setBorderWidth(0)}
              >
                Reset
              </button>
            )}
          </label>
        </div>
      </div>
    </section>
  );
}
