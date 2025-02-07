/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../../../styles/Product.module.css";
import Product from "@/components/Product";
import { useSearchParams } from "next/navigation";
import { useGetProductsByCategoryIdQuery } from "store/services";

function Products({}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useGetProductsByCategoryIdQuery({
    id: Number(id),
  });

  return (
    <div>
      <section className={styles.ProductHeader}>
        <h1>{data?.name?.toUpperCase()}</h1>
      </section>
      {data?.products?.map((product) => {
        return (
          <Product
            isLoading={isLoading}
            key={product.id}
            imgSrc={product?.mainImageUrl}
            productDesc={product?.description}
            productName={product.name}
            id={product?.id}
          />
        );
      })}
    </div>
  );
}

export default Products;
