import Link from "next/link";
import styles from "../../styles/Containers.module.css";
function Footer() {
  return (
    <div className={styles.Footer_Container}>
      <div className={styles.FooterList}>
        <img src="/images/shared/desktop/logo.svg" alt="logo" />
        <ul>
          <Link className={"text-6xl"} href={"/"}>
            HOME
          </Link>
          <Link className={styles.Footerlink} href={"/category?id=1"}>
            HEADPHONES
          </Link>
          <Link className={styles.Footerlink} href={"/categoty?id=2"}>
            SPEAKER
          </Link>
          <Link className={styles.Footerlink} href={"/category?id=3"}>
            EARPHONES
          </Link>
        </ul>
      </div>
      <p className="">
        Audiophile is an all in one stop to fulfill your audio needs. We&apos;re
        a small team of music lovers and sound specialists who are devoted to
        helping you get the most out of personal audio. Come and visit our demo
        facility - we’re open 7 days a week.
      </p>
      <div className={styles.FooterCopy}>
        <p>Copyright 2021. All Rights Reserved</p>
        <div className="flex">
          <img
            className={styles.FooterIcons}
            src="/images/shared/desktop/icon-facebook.svg"
            alt="facebook"
          />
          <img
            src="/images/shared/desktop/icon-instagram.svg"
            alt="instagram"
            className={styles.FooterIcons}
          />
          <img
            src="/images/shared/desktop/icon-twitter.svg"
            className={styles.FooterIcons}
            alt="twitter"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
