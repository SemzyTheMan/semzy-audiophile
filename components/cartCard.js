import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./emptyCart";
import styles from "../styles/cartCard.module.css";
import { settotalQuantity } from "../store/action";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
function CartCard() {
  const router = useRouter();

  const openCart = (state) => state.openCart;
  const dispatch = useDispatch();
  const cartState = useSelector(openCart);

  const [items, setItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products"));
    if (items) {
      setItems(items);
    }
  }, [cartState]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(items));
  }, [items]);

  const cart = {
    items: items ? items.items : [],
    totalQuantity: items ? items.totalQuantity : 0,
    totalPrice: totalPrice,
  };
  useEffect(() => {
    const totalPrice = cart.items.reduce(
      (total, el) => total + el.totalIndividualPrice,
      0
    );

    setTotalPrice(totalPrice);
  }, [cart]);

  if (items === null || items.totalQuantity == 0) {
    return (
      <div
        style={{
          display: cartState ? "block" : "none",
        }}
      >
        <div
          className={styles.Close}
          onClick={() => dispatch({ type: "openCart" })}
        ></div>
        <EmptyCart></EmptyCart>
      </div>
    );
  }
  return (
    <div
      className={styles.Main}
      style={{
        display: cartState ? "block" : "none",
      }}
    >
      <div
        className={styles.Close}
        onClick={() => dispatch({ type: "openCart" })}
      ></div>
      <div className={styles.Container}>
        <div className={styles.Wrap1}>
          <h1>Cart({cart.totalQuantity})</h1>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(settotalQuantity(0));
              setItems(null);
            }}
          >
            Remove All
          </p>
        </div>

        {cart.items.map((el, index) => {
          return (
            <div key={el.name} className={styles.Wrap2}>
              <img src={el.image} alt="img" />
              <div>
                <h3>{el.name}</h3>
                <p>${el.price}</p>
              </div>
              <p className={styles.Quantity}>
                <span
                  onClick={() => {
                    if (el.quantity == 1) {
                      cart.totalQuantity -= 1;
                      dispatch(settotalQuantity(cart.totalQuantity));
                      setTotalPrice(0);
                      cart.items.splice(index, 1);
                      setItems(cart);
                    } else if (el.quantity > 0 && el.quantity !== 1) {
                      el.quantity -= 1;
                      cart.totalQuantity -= 1;
                      dispatch(settotalQuantity(cart.totalQuantity));
                      setTotalPrice(
                        cart.items.reduce((total, el) => {
                          const totalPrice = el.quantity * el.price;
                          total + totalPrice;
                        }, 0)
                      );
                      el.totalIndividualPrice = el.quantity * el.price;

                      setItems(cart);
                    }
                  }}
                >
                  -
                </span>{" "}
                {el.quantity}{" "}
                <span
                  onClick={() => {
                    el.quantity += 1;
                    el.totalIndividualPrice = el.quantity * el.price;
                    cart.totalQuantity += 1;
                    dispatch(settotalQuantity(cart.totalQuantity));
                    setItems(cart);
                  }}
                >
                  +
                </span>
              </p>
            </div>
          );
        })}
        <div className={styles.Wrap3}>
          <h2>TOTAL</h2>
          <h2>${cart.totalPrice}</h2>
        </div>
        <button
          className={styles.Button}
          onClick={() => router.push("/checkout")}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default React.memo(CartCard);
