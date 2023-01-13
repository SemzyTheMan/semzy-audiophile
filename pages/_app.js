import "../styles/globals.css";
import Navigation from "../components/navigation";
import Footer from "../containers/Footer";
import { createStore } from "redux";
import { Provider, useDispatch } from "react-redux";
import { reducer } from "../store/reducer";
import CartCard from "../components/cartCard";
import MobileModal from "../components/MobileModal";

export default function App({ Component, pageProps }) {
 
  
  const store = createStore(reducer);

  return (
    <>
      <Provider store={store}>
        <Navigation></Navigation>
        <Component {...pageProps} />
        <CartCard></CartCard>
        <Footer></Footer>
        <MobileModal></MobileModal>
      </Provider>
    </>
  );
}
