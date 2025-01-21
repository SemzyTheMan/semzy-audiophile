import Shop from "../components/Shop";
import styles from "../styles/Home.module.css";
function ShopSection({ home }) {
  const homeProducts = [
    {
      imageSrc: "/images/shared/desktop/image-headphones.png",
      title: "HEADPHONES",
    },
    {
      imageSrc: "/images/shared/desktop/image-speakers.png",
      title: "SPEAKERS",
    },
    {
      imageSrc: "/images/shared/desktop/image-earphones.png",
      title: "EARPHONES",
    },
  ];
  return (
    <div className={styles.ShopSection} style={home ? { width: "80%" } : null}>
      {homeProducts.map((product) => {
        return <Shop key={product.title} image={product.imageSrc} product={product.title}></Shop>;
      })}
    </div>
  );
}

export default ShopSection;
