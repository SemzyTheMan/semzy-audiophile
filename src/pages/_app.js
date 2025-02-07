import "../../styles/globals.css";
import Navigation from "../components/navigation";
import Footer from "../containers/Footer";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  const prohibitedPaths = [
    "/login",
    "/signup",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const pathname = usePathname();

  return (
    <Provider store={store}>
      {!prohibitedPaths.includes(pathname) ? (
        <>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
          <Toaster richColors position="top-center" />
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}
