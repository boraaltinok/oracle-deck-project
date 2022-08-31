import "../styles/globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  console.log("APP:JS PAGECOTNENT = ", pageProps.pageContent);

  return (
      <Layout pageContent={pageProps.pageContent}>
        <Toaster></Toaster>
        <Component {...pageProps} />
      </Layout>
  );
}

export default MyApp;
