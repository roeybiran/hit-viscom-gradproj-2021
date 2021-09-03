import ErrorPage from "../components/ErrorPage";
import strings from "../lib/strings";
import Head from "next/head";

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
