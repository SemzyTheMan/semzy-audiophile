/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useRef } from "react";
import styles from "../../styles/Checkout.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  useGetCheckOutItemsQuery,
  useInitiatePaymentMutation,
} from "store/services";
import useGetDetails from "@/hooks/useGetDetails";
import { useRouter } from "next/navigation";
function Checkout() {
  const cartCheck = (state) => state.openCart;
  const cartState = useSelector(cartCheck);
  const dispatch = useDispatch();
  const router = useRouter();
  const saveCart = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    setFocus,
    formState: { errors, isValid },
  } = useForm();

  const states = (state) => state.showMobileModal;
  const show = useSelector(states);
  const { userDetails } = useGetDetails();

  const [initiatePayment, { isLoading: isContinueLoading }] =
    useInitiatePaymentMutation();

  const { data: checkoutData, isLoading } = useGetCheckOutItemsQuery(
    {
      id: userDetails?.userId,
    },
    { skip: !userDetails?.userId }
  );

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const onSubmit = async () => {
    try {
      const response = await initiatePayment({
        userId: userDetails?.userId,
      }).unwrap();
      saveCart([]);
      router.push(response?.data?.link);
    } catch (error) {}
  };

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
        </form>
      </div>
      <div className={styles.SummaryContainer}>
        <div className={styles.SummaryWrap}>
          <h2>Summary</h2>

          <div className={styles.Wrap2}>
            <h2>TOTAL</h2>
            <p>₦{checkoutData?.total?.toLocaleString()}</p>
          </div>
          <div className={styles.Wrap2}>
            <h2>SERVICE CHARGE</h2>
            <p>₦{checkoutData?.serviceCharge?.toLocaleString()}</p>
          </div>
          <div className={styles.Wrap2}>
            <h2>VAT(INCLUDED)</h2>
            <p>0</p>
          </div>
          <div className={styles.Wrap3}>
            <h2>GRANDTOTAL</h2>
            <p>
              ₦
              {(
                checkoutData?.serviceCharge + checkoutData?.total
              )?.toLocaleString()}
            </p>
          </div>
          <button
            disabled={isContinueLoading}
            onClick={handleSubmit(onSubmit)}
            className={styles.Continue}
          >
            {isContinueLoading ? "Please wait" : "CONTINUE & PAY"}
          </button>
        </div>
      </div>
      {/* <CheckOutModal grandtotal={VAT + totalPrice + 50}></CheckOutModal> */}
    </div>
  );
}

export default Checkout;
