import Header from "@/components/Header";
import type { AppProps } from "next/app";
import "normalize.css";
import "../styles/globals.css";
import "../styles/prefers-reduced-motion.css";
import "../styles/sr-only.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
