// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @resolveJsonModule: true

// @Filename: /json.json
{ "a": 0 }

// @Filename: /js.js
module.exports = { a: 0 };

// @Filename: /user.js
const json0 = require("./json.json");
json0.b; // Error (good)

/** @type {{ b: number }} */
const json1 = require("./json.json"); // No error (bad)
json1.b; // No error (OK since that's the type annotation)

const js0 = require("./js.js");
json0.b; // Error (good)

/** @type {{ b: number }} */
const js1 = require("./js.js"); // Error (good)
js1.b;