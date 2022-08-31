import React from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../lib/client";

function OracleCart({
  oracleCart: { image, name, slug, details },
  width,
  height,
  showDetails,
}) {
  console.log("src = ", urlFor(image && image[0]));
  var src = urlFor(image && image[0]);

  return (
    <div>
      <div className="product-card">
        {image.length > 0 && (
          <img
            src={src}
            width={width ?? 350}
            height={height ?? 500}
            className="product-image"
          />
        )}

        <p className="product-name">{name}</p>
        <p className="product-price" style={{ width: width ?? 350 }}>
          {showDetails === true ? details : null}
        </p>
      </div>
    </div>
  );
}

export default OracleCart;
