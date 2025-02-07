import styles from "../../styles/Containers.module.css";
import { motion } from "framer-motion";
import React from "react";

const gearVariant = {
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

function GearSection({ home }: { home?: boolean }) {
  return (
    <motion.div
      variants={gearVariant}
      initial="hidden"
      whileInView={"visible"}
      className={`${styles.GearMain} ${home ? styles.Home : ""}`}
    >
      <div className={styles.Geartext}>
        <h1>BRINGING YOU THE BEST AUDIO GEAR</h1>
        <p>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <img src="/images/shared/desktop/image-best-gear.jpg" alt="gear" />
    </motion.div>
  );
}

export default GearSection;
