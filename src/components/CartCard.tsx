import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./emptyCart";
import styles from "../../styles/cartCard.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { useAddItemsToCartMutation } from "store/services";
import useGetDetails from "@/hooks/useGetDetails";
import { toast } from "sonner";
import { showCart } from "store/reducer";
import { Loader2 } from "lucide-react";
function CartCard({ open, onOpenChange }) {
  const router = useRouter();
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.all.showCart);
  const [addCart, { isLoading }] = useAddItemsToCartMutation();
  const { userDetails } = useGetDetails();

  function handleSuccess() {
    onOpenChange();
    router.push("/checkout");
  }

  function handleForbidden() {
    toast.error("Please proceed to login");
    router.push("/login");
  }

  function handleGenericError() {
    toast.error("Something went wrong");
  }
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setItems(items);
    }
  }, [show]);

  const saveCart = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleAddItemToCart = async () => {
    try {
      await addCart({
        userId: userDetails?.userId,
        body: items.map((i) => {
          return {
            productId: i?.id,
            quantity: i?.quantity,
          };
        }),
      }).unwrap();

      onOpenChange();
      router.push("/checkout");
    } catch (err) {
      const { originalStatus } = err;

      // Handle success case (status 200)
      if (originalStatus === 200) {
        handleSuccess();
        return;
      }

      // Handle forbidden case (status 403)
      if (err?.status == 403) {
        handleForbidden();
        return;
      }

      // Handle other errors
      handleGenericError();
    }
  };

  const totalQuantity =
    items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice =
    items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const handleDecrease = (id) => {
    const item = items.find((item) => item.id === id);

    if (item.quantity === 1) {
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      saveCart(newItems);
      dispatch(showCart());
    } else {
      const newItems = items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setItems(newItems);
      saveCart(newItems);
      dispatch(showCart());
    }
  };

  const handleIncrease = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(newItems);
    saveCart(newItems);
    dispatch(showCart());
  };

  return (
    <>
      {open && (
        <div>
          {" "}
          {items?.length < 1 ? (
            <EmptyCart />
          ) : (
            <div className={styles.Main}>
              <div
                className={styles.Close}
                onClick={() => onOpenChange()}
              ></div>
              <div className={styles.Container}>
                <div className={styles.Wrap1}>
                  <h1>Cart({totalQuantity})</h1>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setItems([]);
                      saveCart([]);
                    }}
                  >
                    Remove All
                  </p>
                </div>

                {items?.map((el) => {
                  return (
                    <div key={el.id} className={styles.Wrap2}>
                      <img src={el.image} alt="img" />
                      <div>
                        <h3>{el.name}</h3>
                        <p>${el.price}</p>
                      </div>
                      <p className={styles.Quantity}>
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            handleDecrease(el?.id);
                          }}
                        >
                          -
                        </span>{" "}
                        {el.quantity}{" "}
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            handleIncrease(el?.id);
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
                  <h2>${totalPrice}</h2>
                </div>
                <button
                  disabled={isLoading}
                  className={`${styles.Button} flex justify-center items-center gap-3`}
                  onClick={() => {
                    handleAddItemToCart();
                  }}
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  {isLoading ? "Please wait" : "CHECKOUT"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CartCard;
