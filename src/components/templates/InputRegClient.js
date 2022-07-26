import styles from "./InputRegClient.module.css";
import React from "react";

function InputRegClient({
  type,
  placeholder,
  textLabel,
  name,
  labelStyles,
  makeChange,
  value,
  maxLength,
  check,
}) {
  return (
    <div className={styles.divStyles}>
      {!!textLabel && textLabel.length > 0 && (
        <label className={styles[labelStyles]}>{textLabel}</label>
      )}
      <input
        className={`${styles.inputStyles} ${styles[name]}`}
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        value={value}
        checked={check}
        maxLength={maxLength}
        onChange={(e) => {
          makeChange(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default InputRegClient;
