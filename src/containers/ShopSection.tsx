import Shop from "../components/Shop";
import styles from "../../styles/Home.module.css";
import React from "react";

function ShopSection({ homeProducts }) {
  return (
    <div className={styles.ShopSection}>
      {homeProducts?.map((product) => {
        return <Shop key={product?.id} product={product} />;
      })}
    </div>
  );
}

export default ShopSection;
