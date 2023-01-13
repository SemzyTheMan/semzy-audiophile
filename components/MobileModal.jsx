import ShopSection from "../containers/ShopSection";
import styles from "../styles/MobileModal.module.css";
import { useSelector } from "react-redux";
function MobileModal() {
  const states = (state) => state.showMobileModal;
  const show = useSelector(states);
  console.log(show);
  return (
    <div
      style={
        show
          ? { transform: "translateX(0)" }
          : { transform: "translateX(-100%)" }
      }
      className={styles.Container}
    >
      <div className={styles.Main}>
        <ShopSection></ShopSection>
      </div>
    </div>
  );
}

export default MobileModal;
