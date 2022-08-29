import "../styles/globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  console.log("APP:JS PAGECOTNENT = ", pageProps.pageContent);

  return (
    <StateContext>
      <Layout pageContent={pageProps.pageContent}>
        <Toaster></Toaster>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
