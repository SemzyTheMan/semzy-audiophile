/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useRef } from "react";
import styles from "../styles/Checkout.module.css";
import { settotalQuantity } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CheckOutModal from "../components/checkOutModal";
function checkout() {
  const [paymentOption, setPaymentOption] = useState("e-money");
  const [items, setItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [VAT, setVAT] = useState(0);
  const cartCheck = (state) => state.openCart;
  const cartState = useSelector(cartCheck);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    unregister,
    setFocus,
    formState: { errors, isValid },
  } = useForm();
  useEffect(() => {
    document.body.style.backgroundColor = "#eee";
  }, []);

  const states = (state) => state.showMobileModal;
  const show = useSelector(states);
  useEffect(() => {
    show
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");
    show
      ? (document.body.style.height = "100vh")
      : (document.body.style.height = "auto");
  }, [show]);
  const onSubmit = (data) => {
    console.log(data);
    return dispatch({ type: "showCheckoutModal" });
  };
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products"));
    if (items) {
      setItems(items);
      const totalPrice = items.items.reduce((total, el) => {
        return total + el.totalIndividualPrice;
      }, 0);
      const VAT = Math.round(0.2 * totalPrice);
      setVAT(VAT);
      dispatch(settotalQuantity(items.totalQuantity));
      setTotalPrice(totalPrice);
    }
  }, [cartState]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products"));
    if (items) {
      setItems(items);
      const totalPrice = items.items.reduce((total, el) => {
        return total + el.totalIndividualPrice;
      }, 0);
      const VAT = Math.round(0.2 * totalPrice);
      setVAT(VAT);
      dispatch(settotalQuantity(items.totalQuantity));
      setTotalPrice(totalPrice);
    }
  }, []);
  useEffect(() => {
    console.log(paymentOption);
  }, [paymentOption]);

  let Wrap1 = <div></div>;
  if (items) {
    Wrap1 = (
      <div>
        {items.items.map((product) => {
          return (
            <div className={styles.Wrap1} key={product.name}>
              <img src={product.image} alt={product.name}></img>
              <div className={styles.Product}>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
              <p>x{product.quantity}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className={styles.Container}>
      <div className={styles.FormSection}>
        <h2>CHECKOUT</h2>
        <p>BILLING DETAILS</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.FormWrap}>
          <div className={styles.inputContainer1}>
            <div>
              <div className={styles.LabelContainer}>
                <label htmlFor="">Name</label>
                {errors.name?.type === "required" && (
                  <span>Field cannot be empty</span>
                )}
              </div>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Alex Ward"
                // ref={inputRef}
              />
            </div>
            <div>
              <div className={styles.LabelContainer}>
                <label htmlFor="">Email Address</label>
                {errors.email && <span>Field cannot be empty</span>}
              </div>

              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="alex@mail.com"
              />
            </div>
          </div>
          <div className={styles.inputContainer3}>
            <div className={styles.LabelContainer}>
              <label htmlFor="">Phone Number</label>
              {errors.phonenumber && <span>Field cannot be empty</span>}
            </div>

            <input
              {...register("phonenumber", { required: true })}
              type="number"
              placeholder="+1-202-505-1234"
            />
          </div>
          <p>SHIPPING INFO</p>
          <div className={styles.inputContainer2}>
            <div className={styles.LabelContainer}>
              <label htmlFor="">Your Address</label>
              {errors.homeaddress && <span>Field cannot be empty</span>}
            </div>

            <input
              {...register("homeaddress", { required: true })}
              type="text"
              placeholder="1137 Williams Avenue"
            />
          </div>
          <div className={styles.inputContainer1}>
            <div>
              <div className={styles.LabelContainer}>
                <label htmlFor="">Zip Code</label>
                {errors.zipcode?.type === "required" && (
                  <span>Field cannot be empty</span>
                )}
                {errors.zipcode?.type === "maxLength" && (
                  <span>Wrong Format</span>
                )}
              </div>

              <input
                {...register("zipcode", { required: true, maxLength: 5 })}
                type="number"
                placeholder="10011"
              />
            </div>
            <div>
              <div className={styles.LabelContainer}>
                <label htmlFor="">City</label>
                {errors.city && <span>Field cannot be empty</span>}
              </div>

              <input
                {...register("city", { required: true })}
                type="text"
                placeholder="New York"
              />
            </div>
          </div>
          <div className={styles.inputContainer3}>
            <div className={styles.LabelContainer}>
              <label htmlFor="">Country</label>
              {errors.country && <span>Field cannot be empty</span>}
            </div>

            <input
              {...register("country", { required: true })}
              type="text"
              placeholder="United States"
            />
          </div>
          <p>PAYMENT DETAILS</p>
          <div className={styles.inputContainerR}>
            <p>PAYMENT METHOD</p>
            <div className={styles.RadioSection}>
              <div style={{ marginBottom: "1.4rem" }}>
                <input
                  type="radio"
                  name="payment"
                  value={"e-money"}
                  defaultChecked
                  onClick={(e) => {
                    setPaymentOption(e.target.value);
                  }}
                />
                <label htmlFor="">e-Money</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  value={"Cash on Delivery"}
                  onClick={(e) => {
                    setPaymentOption(e.target.value);
                  }}
                />
                <label htmlFor="">Cash on Delivery</label>
              </div>
            </div>
          </div>
          <div
            style={
              paymentOption === "Cash on Delivery"
                ? { display: "none" }
                : { dispaly: "flex" }
            }
            className={styles.inputContainer1}
          >
            <div>
              <div className={styles.LabelContainer}>
                <label htmlFor="">e-Money Number</label>
                {errors.eMoneyNumber && <span>Field cannot be empty</span>}
              </div>

              {paymentOption === "e-money" && (
                <input
                  {...register("eMoneyNumber", { required: true })}
                  type="number"
                  placeholder="1234567890"
                />
              )}
            </div>
            <div>
              <div className={styles.LabelContainer}>
                <label htmlFor="">e-Money Pin</label>
                {errors.eMoneyPin?.type === "required" && (
                  <span>Field cannot be empty</span>
                )}
                {errors.eMoneyPin?.type === "maxLength" && (
                  <span>Wrong Format</span>
                )}
              </div>
              {paymentOption === "e-money" && (
                <input
                  {...register("eMoneyPin", { required: true, maxLength: 4 })}
                  type="number"
                  placeholder="6891"
                />
              )}
            </div>
          </div>
          <div
            style={
              paymentOption === "e-money"
                ? { display: "none" }
                : { dispaly: "block" }
            }
            className={styles.inputContainer1}
          >
            <img
              src="/images/checkout/icon-cash-on-delivery.svg"
              alt="pay on delivery"
              style={{ marginRight: "1.3rem" }}
            ></img>
            <p>
              The ‘Cash on Delivery’ option enables you to pay in cash when our
              delivery courier arrives at your residence. Just make sure your
              address is correct so that your order will not be cancelled.
            </p>
          </div>
        </form>
      </div>
      <div className={styles.SummaryContainer}>
        <div className={styles.SummaryWrap}>
          <h2>Summary</h2>
          {Wrap1}
          <div className={styles.Wrap2}>
            <h2>TOTAL</h2>
            <p>${totalPrice}</p>
          </div>
          <div className={styles.Wrap2}>
            <h2>SHIPPING</h2>
            <p>$50</p>
          </div>
          <div className={styles.Wrap2}>
            <h2>VAT(INCLUDED)</h2>
            <p>${VAT}</p>
          </div>
          <div className={styles.Wrap3}>
            <h2>GRANDTOTAL</h2>
            <p>${VAT + totalPrice + 50}</p>
          </div>
          <button onClick={handleSubmit(onSubmit)} className={styles.Continue}>
            CONTINUE & PAY
          </button>
        </div>
      </div>
      <CheckOutModal grandtotal={VAT + totalPrice + 50}></CheckOutModal>
    </div>
  );
}

export default checkout;
