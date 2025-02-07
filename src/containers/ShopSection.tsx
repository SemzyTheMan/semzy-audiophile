import Shop from "../components/Shop";
import styles from "../../styles/Home.module.css";
import React from "react";

function ShopSection({
  homeProducts,
  className,
}: Readonly<{
  homeProducts: any;
  className?: string;
}>) {
  return (
    <div className={`${styles.ShopSection} ${className}`}>
      {homeProducts?.map((product) => {
        return <Shop key={product?.id} product={product} />;
      })}
    </div>
  );
}

export default ShopSection;
