import styles from "../../styles/cartCard.module.css";
import Image from "next/image";
function EmptyCart() {
  return (
    <div className={styles.Emptycart}>
      <div className={styles.EmptyChild}>
        <h2>Your cart is empty</h2>
        <Image
          alt="empty cart"
          src="/images/shared/desktop/icon-empty.svg"
          width={"80"}
          height={"100"}
        />
      </div>
    </div>
  );
}

export default EmptyCart;
