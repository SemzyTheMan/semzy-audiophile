/* eslint-disable react-hooks/rules-of-hooks */
import Button from "../components/button";
import styles from "../styles/Home.module.css";
import ShopSection from "../containers/ShopSection";
import GearSection from "../containers/GearSection";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settotalQuantity } from "../store/action";
import { useRouter } from "next/router";
function Home() {
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
      <div className={styles.Main}>
        <div className={styles.Width}>
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
        </div>
      </div>
      <ShopSection home={true}></ShopSection>
      <section className={styles.ZX9Container}>
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
      </section>
      <section className={styles.ZX7Container}>
        <div className={styles.ZX7}>
          <h2>ZX7 SPEAKER</h2>
          <Button
            white={true}
            clicked={() => router.push("speakers/zx7-speaker")}
          ></Button>
        </div>
      </section>
      <section className={styles.YX1Container}>
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
      </section>
      <GearSection home={true}></GearSection>
    </div>
  );
}

export default Home;
