import styles from "./ButtonGeneric.module.css";
import React from "react";

function ButtonGeneric({
  textButton,
  type,
  colorBg,
  colorText,
  name,
  focus,
  event,
  onClick,
}) {
  return (
    <div>
      <button
        className={`${styles.inputStyles} 
        ${focus ? styles[colorBg + "Focus"] : styles[colorBg]} 
        ${styles[colorText]}`}
        type={type}
        id={name}
        name={name}
        onClick={onClick}
      >
        <p>{textButton}</p>
      </button>
    </div>
  );
}

export default ButtonGeneric;
