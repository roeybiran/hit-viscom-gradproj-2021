import "normalize.css";
import "../styles/prefers-reduced-motion.css";
import "../styles/sr-only.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
