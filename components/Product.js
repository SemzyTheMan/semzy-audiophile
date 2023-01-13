import styles from "../styles/Product.module.css";
import Button from "./button";
import { useRouter } from "next/router";
function Product({
  imgSrc,
  productName,
  productDesc,
  productContent,
  imgSrc1,
  imgSrc2
}) {
  const router = useRouter();

  return (
    <div className={styles.ProductMain}>
      <picture className={styles.Picture}>
        <source media="(max-width:768px)" srcSet={imgSrc1} />
        <source media="(max-width:425px)" srcSet={imgSrc2} />
        <img className={styles.ProductImg} src={imgSrc} />
      </picture>

      <div className={styles.ProductText}>
        <p className={styles.productp1}>NEW PRODUCT</p>
        <h1>{productName}</h1>
        <p className={styles.productp2}>{productDesc}</p>

        <Button
          clicked={() => router.push(router.asPath + "/" + productContent)}
        ></Button>
      </div>
    </div>
  );
}

export default Product;
