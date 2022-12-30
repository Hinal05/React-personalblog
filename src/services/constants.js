const constants = Object.freeze({
  BASE_URL: 'https://decouple-drupal.ddev.site',
  JSONAPI: "/jsonapi",
  MEDIA: "/media/image",
  FIELD_IMAGE_FILE: "/field_media_image",
  NODE: "/node",
  RELATIONSHIPS: "/relationships",
  TAXONOMY: "/taxonomy_term",
  TAGS: "/tags",
  ALL: "/all",
  PARAGRAPH: "/paragraph",
  ARTICLE: "/article",
  INCLUDED: "?include=uid,field_tags,field_image",
});

export default constants;
