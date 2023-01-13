import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import data from "../public/products.json";
import { useDispatch, useSelector } from "react-redux";
import { settotalQuantity } from "../store/action";
import { router } from "next/router";
import styles from "../styles/Product.module.css";
function products({ products, product, params }) {
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

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products"));
    if (items) {
      setItems(items);
      dispatch(settotalQuantity(items.totalQuantity));
    }
  }, [params.products]);

  const particularProduct = products.products.filter((pro) => {
    return pro.category === product;
  });

  return (
    <div>
      <section className={styles.ProductHeader}>
        <h1>{product.toUpperCase()}</h1>
      </section>
      {particularProduct.map((product) => {
        return (
          <Product
            key={product.id}
            imgSrc2={product.categoryImage.mobile}
            imgSrc={product.categoryImage.desktop}
            imgSrc1={product.categoryImage.tablet}
            productDesc={product.description}
            productName={product.name}
            productContent={product.slug}
          ></Product>
        );
      })}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { params } = ctx;

  return {
    props: {
      products: data,
      product: params.products,
      params: params,
    },
  };
};
export default products;
