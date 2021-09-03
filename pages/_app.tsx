import "normalize.css";
import "../styles/prefers-reduced-motion.css";
import "../styles/sr-only.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
