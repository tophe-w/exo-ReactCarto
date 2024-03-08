import React from "react";
import "./switch.css";

interface Props {
  switchName: string;
  useBlackMarker: boolean;
  onChange: () => void;
}

const Switch: React.FC<Props> = ({ switchName, useBlackMarker, onChange }) => {
  return (
    <div className="container">
      {switchName}{" "}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          id="input-switch"
          onChange={onChange}
          aria-label="marker-switch"
          checked={useBlackMarker}
        />
        <label className="label" htmlFor="input-switch">
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default Switch;
