/* eslint-disable react-hooks/rules-of-hooks */
import Button from "../components/button";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import ShopSection from "../containers/ShopSection";
import GearSection from "../containers/GearSection";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settotalQuantity } from "../store/action";
import { useRouter } from "next/router";

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
  const states = (state) => state.showMobileModal;
  const show = useSelector(states);
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);
  useEffect(() => {
    show
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "visible");
    show
      ? (document.body.style.height = "100vh")
      : (document.body.style.height = "auto");
  }, [show]);
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products"));
    if (items) {
      setItems(items);
      dispatch(settotalQuantity(items.totalQuantity));
    }
  }, []);
  const router = useRouter();
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
              <Button
                clicked={() =>
                  router.push("headphones/xx99-mark-two-headphones")
                }
              ></Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <ShopSection home={true}></ShopSection>
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
            <p>
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Button
              black={true}
              clicked={() => router.push("speakers/zx9-speaker")}
            ></Button>
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
            clicked={() => router.push("speakers/zx7-speaker")}
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
              clicked={() => router.push("earphones/yx1-earphones")}
            ></Button>
          </div>
        </div>
      </motion.section>
      <GearSection home={true}></GearSection>
    </div>
  );
}

export default Home;
