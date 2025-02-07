import React from "react";
import styles from "../../styles/Navigation.module.css";

interface ButtonProps {
  black?: boolean;
  white?: boolean;
  clicked: () => void;
}

function Button({ black, white, clicked }: ButtonProps) {
  return (
    <button
      className={`${styles.Button} ${black === true ? styles.black : ""} ${
        white === true ? styles.white : ""
      }`}
      onClick={clicked}
    >
      SEE PRODUCT
    </button>
  );
}

export default Button;
