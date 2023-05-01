import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import product from "./product";
import banner from "./banner";
import oraclecart from "./oracle_cart";
import oracleCartDup1 from "./cart_dup1";
import oracleCartDup2 from "./cart_dup2";

import pagecontent from "./page_content";
import pagecontentDup1 from "./page_content_dup1";
import pagecontentDup2 from "./page_content_dup2";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    banner,
    oraclecart,
    pagecontent,
    pagecontentDup1,
    pagecontentDup2,
    oracleCartDup1,
    oracleCartDup2,
  ]),
});
