import ErrorPage from "../components/ErrorPage";
import strings from "../lib/strings";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{strings.heads[404].title}</title>
        <meta name="description" content={strings.heads[404].description} />
      </Head>
      <ErrorPage errorMessage={strings.heads[404].description} />
    </>
  );
}
