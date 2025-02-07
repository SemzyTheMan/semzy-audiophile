"use client";

import styles from "../../../styles/ProContent.module.css";
import MayLike from "../../components/MayLike";
import { useRouter } from "next/router";
import ShopSection from "../../containers/ShopSection";
import GearSection from "../../containers/GearSection";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductsByIdQuery,
} from "store/services";
import { usePathname, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { manageCart } from "../../components/manageCart";
import { showCart } from "store/reducer";
import { toast } from "sonner";

function ProductContent() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  const pathname = usePathname();
  const id = searchParams.get("id");
  const dispatch = useDispatch();

  const {
    data: productData,
    isLoading: isProductLoading,
    isFetching: isProductFetching,
  } = useGetProductsByIdQuery({ id: Number(id) });

  const { data: categoryData } = useGetAllCategoriesQuery();

  const { data: products } = useGetAllProductsQuery();

  const tempFormattedText = !isProductLoading && productData?.features + "";
  const formattedText =
    !isProductLoading && tempFormattedText?.replace(/\\n\\n/g, "<br><br>");

  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const { addToCart, getCartItems } = manageCart();

  const [cart, setCart] = useState([]);

  const handleProductClick = (id) => {
    params.set("id", id);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchedCart = getCartItems();
    setCart(fetchedCart);

    // Find the ordered item and set the quantity if it exists
    const orderedItem = fetchedCart.find((item) => item.id === productData?.id);
    if (orderedItem) {
      setQuantity(orderedItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [productData?.id]);

  return (
    <div className={styles.Container}>
      <div className={styles.Main}>
        {isProductLoading || isProductFetching ? (
          <Skeleton className={`h-[30rem] ${styles.ProductImg}`} />
        ) : (
          <img
            className={styles.ProductImg}
            src={productData?.mainImageUrl}
            alt="img"
          />
        )}
        <div className={styles.ProductDesc}>
          {isProductLoading || isProductFetching ? (
            <Skeleton className="h-[15rem]" />
          ) : (
            <>
              <h1>{productData?.name}</h1>
              <p>{productData?.description}</p>
            </>
          )}

          {!(isProductFetching || isProductLoading) && (
            <p className={styles.price}>
              ₦{productData?.price.toLocaleString()}
            </p>
          )}
          {!(isProductFetching || isProductLoading) && (
            <div className={styles.ProductCart}>
              <p>
                <span
                  onClick={() => {
                    quantity > 1 && setQuantity((q) => q - 1);
                  }}
                >
                  -
                </span>
                {quantity}
                <span
                  onClick={() => {
                    setQuantity((q) => q + 1);
                  }}
                >
                  +
                </span>
              </p>
              <button
                onClick={() => {
                  dispatch(showCart());
                  toast.success("Item added to cart");
                  addToCart({
                    id: productData?.id,
                    quantity: quantity,
                    name: productData?.name,
                    image: productData?.mainImageUrl,
                    price: productData?.price,
                  });
                }}
              >
                ADD TO CART
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.Features}>
        <div className={styles.FeatureText}>
          <h1>FEATURES</h1>
          {isProductLoading || isProductFetching ? (
            <Skeleton className={"h-[20rem] mb-3"} />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: formattedText,
              }}
            />
          )}
        </div>
        <div className={styles.FeatureListSec}>
          <h1>IN THE BOX</h1>
          {isProductLoading || isProductFetching ? (
            <div className="grid grid-cols-1 gap-3 mt-5">
              {Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} className={"h-10"} />
              ))}
            </div>
          ) : (
            <ul className={styles.FeatureList}>
              {productData?.inThebox.map((el) => {
                return (
                  <li key={el.item}>
                    <span style={{ color: "#d87d4a", paddingRight: "0.8rem" }}>
                      {el.quantity}x{" "}
                    </span>{" "}
                    {el.item}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.Gallery}>
        <div className={styles.Gallery1}>
          {isProductLoading || isProductFetching ? (
            <>
              <Skeleton className={"h-[20rem] mb-3"} />
              <Skeleton className={"h-[20rem]"} />{" "}
            </>
          ) : (
            <>
              {" "}
              <img
                className={styles.Img1}
                src={productData?.imageOne}
                alt="img"
              />
              <img
                className={styles.Img2}
                src={productData?.imageTwo}
                alt="img"
              />
            </>
          )}
        </div>
        <div>
          {isProductLoading || isProductFetching ? (
            <Skeleton className={"h-full"} />
          ) : (
            <img
              className={"h-full rounded-[1rem]"}
              src={productData?.imageThree}
              alt="img"
            />
          )}
        </div>
      </div>
      <div>
        <h1 className="text-center text-3xl font-medium my-10">
          You may also like
        </h1>
        <div className={styles.MayLike}>
          {products
            ?.filter((p) => p.id != id)
            .slice(0, 3)
            .map((product) => {
              return (
                <MayLike
                  key={product.id}
                  name={product.name}
                  imgSrc={product.mainImageUrl}
                  clicked={() => handleProductClick(product.id)}
                />
              );
            })}
        </div>
      </div>
      <ShopSection homeProducts={categoryData} />
      <GearSection />
    </div>
  );
}

export default ProductContent;
