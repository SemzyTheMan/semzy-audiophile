import styles from "../../styles/Navigation.module.css";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import useGetDetails from "@/hooks/useGetDetails";
import CartCard from "./CartCard";
import MobileModal from "./MobileModal";
import { useGetAllCategoriesQuery } from "store/services";

function Navigation() {
  const router = useRouter();
  const [items, setItems] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [showSide, setShowSide] = useState(false);
  const { data } = useGetAllCategoriesQuery();
  const { userDetails } = useGetDetails();

  const show = useSelector((state: any) => state.all.showCart);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setItems(items);
    }
  }, [show]);

  const totalQuantity =
    items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <div className={styles.Container}>
      <div className={styles.Subcontainer}>
        <img
          className={styles.Hamburger}
          onClick={() => {
            setShowSide(!showSide);
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

        <button
          className="hover:text-amber-500 hidden md:block"
          onClick={() => {
            if (userDetails?.token) {
              localStorage.removeItem("userDetails");
            }

            router.push("/login");
          }}
        >
          {userDetails?.token ? "Logout" : "Log in"}
        </button>

        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setOpenCart(!openCart)}
        >
          <Image
            alt="cart"
            src={"/images/shared/desktop/icon-cart.svg"}
            width="30"
            height={"30"}
          />
          <span
            style={{
              position: "absolute",
              top: "-1rem",
              right: "-1rem",
              padding: ".3rem .55rem",
              backgroundColor: "red",
              borderRadius: "50%",
              display: totalQuantity > 0 ? "block" : "none",
            }}
          >
            {totalQuantity}
          </span>
        </div>
      </div>
      <CartCard open={openCart} onOpenChange={() => setOpenCart(false)} />
      <MobileModal
        categories={data}
        onOpenChange={() => setShowSide(false)}
        show={showSide}
      />
    </div>
  );
}

export default Navigation;
