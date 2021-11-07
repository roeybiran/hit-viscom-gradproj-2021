import Head from "next/head";
import ErrorPage from "../components/ErrorPage";
import strings from "../lib/strings";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>{strings.heads[500].title}</title>
        <meta name="description" content={strings.heads[500].description} />
      </Head>
      <ErrorPage errorMessage={strings[500]} />
    </>
  );
}
