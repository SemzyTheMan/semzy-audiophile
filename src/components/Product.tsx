import Image from "next/image";
import styles from "../../styles/Product.module.css";
import Button from "./button";
import { useRouter } from "next/router";
import { Skeleton } from "./ui/skeleton";

function Product({ imgSrc, productName, productDesc, id, isLoading }) {
  const router = useRouter();

  return (
    <div className={styles.ProductMain}>
      <div className="relative w-full h-[20rem] md:h-[35rem]">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Image fill alt="" src={imgSrc} />
        )}
      </div>

      {isLoading ? (
        <Skeleton className="h-[25rem] w-full"/>
      ) : (
        <div className=" grid grid-cols-1 gap-7 ">
          <p className={styles.productp1}>NEW PRODUCT</p>
          <h1>{productName}</h1>
          <p className={styles.productp2}>{productDesc}</p>

          <div className="justify-start">
            <Button clicked={() => router.push(`/products?id=${id}`)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
