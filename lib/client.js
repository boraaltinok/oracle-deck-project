import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "pihvhfl8",
  dataset: "production",
  apiVersion: "2022-08-13",
  useCdn: true,
  token: process.env.BASE_URL,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
