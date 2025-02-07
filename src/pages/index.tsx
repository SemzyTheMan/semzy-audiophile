/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Button from "../components/button";
import { motion } from "framer-motion";
import styles from "../../styles/Home.module.css";
import ShopSection from "../containers/ShopSection";
import GearSection from "../containers/GearSection";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { settotalQuantity } from "../../store/action";
import { useRouter } from "next/router";
import {
  useGetAllCategoriesQuery,
  useVerifyPaymentMutation,
} from "store/services";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PaymentSuccess from "@/components/Modals/PaymentSuccess";
import { showCart } from "store/reducer";

const myVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
function Home() {
  const { data } = useGetAllCategoriesQuery();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [verifyPayment] = useVerifyPaymentMutation();
  const params = new URLSearchParams();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const transactionId = searchParams?.get("transaction_id");

  const saveCart = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  const [items, setItems] = useState(null);

  useEffect(() => {
    async function verify() {
      if (transactionId) {
        try {
          await verifyPayment({ transactionId: transactionId }).unwrap();
          params.delete("transaction_id");
          params.delete("status");
          params.delete("tx_ref");
          router.push({
            pathname: pathName,
            query: params.toString(),
          });
          saveCart([]);
          dispatch(showCart());
          setOpenSuccessModal(true);
        } catch (error) {
          toast.error("An error occurred while verifying payment");
        }
      }
    }

    verify();
  }, [transactionId]);

  const dispatch = useDispatch();
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const items = storedProducts ? JSON.parse(storedProducts) : null;
    if (items) {
      setItems(items);
      dispatch(settotalQuantity(items.totalQuantity));
    }
  }, []);

  return (
    <div className={styles.Container}>
      <motion.div className={styles.Main}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className={styles.Width}
        >
          <div>
            <h2>NEW PRODUCT</h2>
            <h1>XX99 MARK II HEADPHONES</h1>
            <p>
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <div className={styles.Button}>
              <Button clicked={() => router.push("products?id=1")} />
            </div>
          </div>
        </motion.div>
      </motion.div>
      <ShopSection homeProducts={data} />
      <motion.section
        variants={myVariants}
        initial="hidden"
        whileInView={"visible"}
        className={styles.ZX9Container}
      >
        <div className={styles.ZX9}>
          <img src="/images/home/mobile/image-speaker-zx9.png" alt="speaker" />
          <div className={styles.ZX9Text}>
            <h2>ZX9 SPEAKER</h2>
            <p className="text-red-500 ">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Button black={true} clicked={() => router.push("products?id=5")} />
          </div>
        </div>
      </motion.section>
      <motion.section
        variants={myVariants}
        initial="hidden"
        whileInView={"visible"}
        className={styles.ZX7Container}
      >
        <div className={styles.ZX7}>
          <h2>ZX7 SPEAKER</h2>
          <Button
            white={true}
            clicked={() => router.push("products?id=4")}
          ></Button>
        </div>
      </motion.section>
      <motion.section
        variants={myVariants}
        initial="hidden"
        whileInView={"visible"}
        className={styles.YX1Container}
      >
        <div className={styles.YX1}>
          <div className={styles.YX1img}></div>

          <div className={styles.YX1Text}>
            <h2>YX1 EARPHONES</h2>
            <Button
              white={true}
              clicked={() => router.push("products?id=6")}
            />
          </div>
        </div>
      </motion.section>
      <GearSection home={true} />
      <PaymentSuccess
        open={openSuccessModal}
        onOpenChange={() => setOpenSuccessModal(false)}
      />
    </div>
  );
}

export default Home;
