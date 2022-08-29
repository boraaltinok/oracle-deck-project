import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import pageContent from "../sanity_ecommerce/schemas/page_content";
import { client } from "../lib/client";
import axios from "axios";

function Layout({ children, pageContent }) {
  return (
    <div className="layout">
      <Head>
        <title>Oracle Deck</title>
      </Head>
      <header>{/*<Navbar />*/}</header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer pageContent={pageContent} />
      </footer>
    </div>
  );
}

export default Layout;
