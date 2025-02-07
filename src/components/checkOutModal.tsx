import styles from "../../styles/CheckoutModal.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function CheckOutModal({ grandtotal }) {
  const [items, setItems] = useState(null);
  const states = (state) => state.showCheckoutModal;
  const checkOutModal = useSelector(states);
  
  const router = useRouter();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products"));
    if (items) {
      setItems(items);
    }
  }, []);
  return (
    <div
      style={checkOutModal ? { display: "flex" } : { display: "none" }}
      className={styles.Container}
    >
      <div className={styles.Wrap}>
        <img src="/images/shared/desktop/icon-check-mark.svg" alt="icon mark" />
        <h1>THANK YOU FOR YOUR ORDER</h1>
        <p>You will receive an email confirmation shortly</p>
        <div className={styles.Summary}>
          <div className={styles.Summary1}>
            <div className={styles.Wrap1}>
              <img src={items?.items[0]?.image} alt="img"></img>
              <div className={styles.Product}>
                <h3>{items?.items[0].name}</h3>
                <p>${items?.items[0].price}</p>
              </div>
              <p>x{items?.items[0].quantity}</p>
            </div>
            <p
              style={
                items?.items.length > 1
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              and {items?.items.length - 1} other item(s)
            </p>
          </div>

          <div className={styles.Wrap2}>
            <h3>GRAND TOTAL</h3>
            <p>${grandtotal}</p>
          </div>
        </div>
        <button className={styles.Button} onClick={() => router.replace("/")}>
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}

export default CheckOutModal;
