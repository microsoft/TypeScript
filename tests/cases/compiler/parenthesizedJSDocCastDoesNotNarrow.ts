// @strict: true
// @noEmit: true
// @checkJs: true
// @allowJs: true

// @filename: index.js

let value = "";

switch (/** @type {"foo" | "bar"} */ (value)) {
  case "bar":
    value;
    break;

  case "foo":
    value;
    break;

  case "invalid":
    value;
    break;
}
