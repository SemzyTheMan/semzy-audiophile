import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "lucide-react";
function Shop({ product }) {
  const router = useRouter();
  return (
    <div
      className={styles.ShopHead}
      onClick={() => router.push(`category?id=${product?.id}`)}
    >
      <div className={styles.Shop}>
        <Image
          alt="shop"
          src={product?.imageUrl}
          className={""}
          width={"150"}
          height={"150"}
        />
        <h2 className={styles.ShopTitle}>{product?.name?.toUpperCase()}</h2>
        <div className="flex items-center gap-1">
          <p>SHOP </p>
          <ChevronRightIcon className="text-amber-700" />
        </div>
      </div>
    </div>
  );
}

export default Shop;
