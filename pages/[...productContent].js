/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../styles/ProContent.module.css";
import MayLike from "../components/MayLike";
import data from "../public/products.json";
import { settotalQuantity } from "../store/action";
import { useRouter } from "next/router";
import ShopSection from "../containers/ShopSection";
import GearSection from "../containers/GearSection";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function productContent({ products, currentProduct, params }) {
  const [current] = products.products.filter(
    (product) => product.slug === currentProduct
  );
  const dispatch = useDispatch();
  const states = (state) => state.showMobileModal;
  const show = useSelector(states);
  const [items, setItems] = useState(null);
  const [alert, setAlert] = useState(false);
  const [ordered, setOrdered] = useState(0);
  useEffect(() => {
    show
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "visible");
    show
      ? (document.body.style.height = "100vh")
      : (document.body.style.height = "auto");
  }, [show]);
  useEffect(() => {
    setAlert(false);
    const items = JSON.parse(localStorage.getItem("products"));
    if (items) {
      setItems(items);
      dispatch(settotalQuantity(items.totalQuantity));
      const currentQuantity = items.items.filter(
        (el) => el.name === current.shortName
      );
      const totalQuantity = items.items.reduce(
        (total, el) => total + el.quantity,
        0
      );
      setTotalQuantity(totalQuantity);
      if (currentQuantity.length > 0) {
        setOrdered(currentQuantity[0].quantity);
      } else {
        setOrdered(0);
      }
    }
  }, []);
  useEffect(() => {
    setAlert(false);
    if (items) {
      setItems(items);
      dispatch(settotalQuantity(items.totalQuantity));
      const currentQuantity = items.items.filter(
        (el) => el.name === current.shortName
      );
      const totalQuantity = items.items.reduce(
        (total, el) => total + el.quantity,
        0
      );
      setTotalQuantity(totalQuantity);
      if (currentQuantity.length > 0) {
        setOrdered(currentQuantity[0].quantity);
      } else {
        setOrdered(0);
      }
    }
  }, [params.productContent[0], params.productContent[1]]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const cart = {
    items: items ? items.items : [],
    totalQuantity: totalQuantity,
  };
  const itemInfo = new (function () {
    this.image = current.cartImage;
    this.price = current.price;
    this.name = current.shortName;
    this.quantity = ordered;
    this.totalIndividualPrice = this.price * this.quantity;
  })();

  const router = useRouter();
  const mayLike = current.others;

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(items));
  }, [items]);

  const addItems = () => {
    cart.items.find((el, index) => {
      el.name === itemInfo.name && el.quantity !== itemInfo.quantity
        ? (cart.items[index] = itemInfo)
        : null;
    });

    // cart.items[]

    cart.items.find(
      (el) => el.name === itemInfo.name && el.quantity === itemInfo.quantity
    ) || itemInfo.quantity < 1
      ? null
      : cart.items.push(itemInfo);
  };
  return (
    <div className={styles.Container}>
      {alert && ordered > 0 && (
        <div className={styles.Alert}>
          <img src="/images/shared/desktop/icon-added.svg" alt="icon" />
          <p> Item {current.name} was added to cart</p>
          <button onClick={() => setAlert(false)}>X</button>
        </div>
      )}

      <div className={styles.Main}>
        <img
          className={styles.ProductImg}
          src={current.categoryImage.mobile}
          alt="img"
        />
        <div className={styles.ProductDesc}>
          <h1>{current.name}</h1>
          <p>{current.description}</p>
          <p className={styles.price}>${current.price}</p>
          <div className={styles.ProductCart}>
            <p>
              <span
                onClick={() => {
                  ordered > 0 ? setOrdered((ordered) => ordered - 1) : null;
                  ordered > 0
                    ? setTotalQuantity((totalQuantity) => totalQuantity - 1)
                    : null;
                }}
              >
                -
              </span>
              {ordered}
              <span
                onClick={() => {
                  setOrdered((ordered) => ordered + 1);
                  setTotalQuantity((totalQuantity) => totalQuantity + 1);
                }}
              >
                +
              </span>
            </p>
            <button
              onClick={() => {
                addItems();
                setAlert(true);
                dispatch(settotalQuantity(cart.totalQuantity));
                setItems(cart);
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className={styles.Features}>
        <div className={styles.FeatureText}>
          <h1>FEATURES</h1>
          <pre>{current.features}</pre>
        </div>
        <div className={styles.FeatureListSec}>
          <h1>IN THE BOX</h1>
          <ul className={styles.FeatureList}>
            {current.includedItems.map((el) => {
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
        </div>
      </div>
      <div className={styles.Gallery}>
        <div className={styles.Gallery1}>
          <img
            className={styles.Img1}
            src={current.gallery.first.desktop}
            alt="img"
          />
          <img
            className={styles.Img2}
            src={current.gallery.second.desktop}
            alt="img"
          />
        </div>
        <div
          style={{ backgroundImage: `url(${current.gallery.third.mobile})` }}
          className={styles.Gallery2}
        ></div>
      </div>
      <div>
        <h1 style={{ textAlign: "center", marginTop: "5rem" }}>
          You may also like
        </h1>
        <div className={styles.MayLike}>
          {mayLike.map((product) => {
            return (
              <MayLike
                key={product.name}
                name={product.name}
                imgSrc={product.image.desktop}
                imgSrc1={product.image.mobile}
                clicked={() => router.push(product.slug)}
              ></MayLike>
            );
          })}
        </div>
      </div>
      <ShopSection></ShopSection>
      <GearSection></GearSection>
    </div>
  );
}

export default productContent;

export const getServerSideProps = async (ctx) => {
  const { params } = ctx;
  console.log(params);

  return {
    props: {
      products: data,
      currentProduct: params.productContent[1],
      params: params,
    },
  };
};
