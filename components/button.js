import styles from "../styles/Navigation.module.css";

function Button({ black, white, clicked }) {
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
