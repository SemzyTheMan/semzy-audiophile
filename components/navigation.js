import styles from "../styles/Navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import { settotalQuantity } from "../store/action";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
function Navigation({ cartClick }) {
  const [items, setItems] = useState(null);
  const openCart = (state) => state.openCart;

  const totalQuantityCheck = (state) => state.totalQuantity;
  const cartState = useSelector(openCart);
  const totalQuantity = useSelector(totalQuantityCheck);
  const states = (state) => state.showMobileModal;
  const show = useSelector(states);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products"));
    if (items) {
      setItems(items);
      dispatch(settotalQuantity(items.totalQuantity));
    }
  }, []);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products"));
    if (items) {
      setItems(items);
    }
  }, [cartState]);

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className={styles.Container}>
      <div className={styles.Subcontainer}>
        <img
          className={styles.Hamburger}
          onClick={() => {
            dispatch({ type: "showMobileModal" });
          }}
          src={
            show
              ? "/images/shared/tablet/icon-close-menu.svg"
              : "/images/shared/tablet/icon-hamburger.svg"
          }
          alt=""
        />
        <img
          onClick={() => router.replace("/")}
          src="/images/shared/desktop/logo.svg"
          alt="logo"
        />
        <ul>
          <Link
            className={`${styles.Link} ${
              router.route === "/" ? styles.active : ""
            }`}
            href={"/"}
          >
            HOME
          </Link>
          <Link className={styles.Link} href={"/headphones"}>
            HEADPHONES
          </Link>
          <Link className={styles.Link} href={"/speakers"}>
            SPEAKERS
          </Link>
          <Link className={styles.Link} href={"/earphones"}>
            EARPHONES
          </Link>
        </ul>
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => dispatch({ type: "openCart" })}
        >
          <Image
            src={"/images/shared/desktop/icon-cart.svg"}
            width="30"
            height={"30"}
          ></Image>
          <span
            style={{
              position: "absolute",
              top: "-1rem",
              right: "-1rem",
              padding: ".3rem .55rem",
              backgroundColor: "#d87d4a",
              borderRadius: "50%",
              display: totalQuantity > 0 ? "block" : "none",
            }}
          >
            {totalQuantity}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
