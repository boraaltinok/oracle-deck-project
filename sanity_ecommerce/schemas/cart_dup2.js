export default {
  name: "cart_dup2",
  title: "Cart Deck Duplication2",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      of: [{ type: "image" }],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
    {
      name: "isShowing",
      title: "IsShowing",
      type: "boolean",
      initialValue: false,
    },
  ],
};
