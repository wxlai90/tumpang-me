import "./input-text.css";

const InputText = ({ label, ...otherProps }) => {
  return (
    <div className="input-container">
      <label className="input-label">
        <span>{label}</span>
        <input
          className="input-text"
          type="text"
          spellCheck="false"
          {...otherProps}
        />
      </label>
    </div>
  );
};

export default InputText;
