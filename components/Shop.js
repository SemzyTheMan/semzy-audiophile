import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
function Shop({ image, product }) {
  const router = useRouter();
  return (
    <div
      className={styles.ShopHead}
      onClick={() => router.push(product.toLowerCase())}
    >
      <div className={styles.Shop}>
        <Image
          src={image}
          className={styles.ShopImg}
          width={"150"}
          height={"150"}
        ></Image>
        <h2 className={styles.ShopTitle}>{product}</h2>
        <p className={styles.ShopText}>
          SHOP{" "}
          <span>
            <img
              src="/images/shared/desktop/icon-arrow-right.svg"
              alt="right"
            />
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default Shop;
