import styles from "../styles/Maylike.module.css";

import Button from "./button";
function MayLike({ name, imgSrc, clicked,imgSrc1 }) {
  return (
    <div className={styles.Container}>
      <picture>
        <source media="(max-width:425px)" srcSet={imgSrc1} />
        <img src={imgSrc} alt="product link" style={{ width: "100%" }} />
      </picture>

      <h2 >{name}</h2>
      <Button clicked={clicked}></Button>
    </div>
  );
}

export default MayLike;
