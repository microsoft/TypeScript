// @module: preserve
// @moduleResolution: bundler
// @defaultIsModuleExports: node16
// @allowRequireESM: always, node16
// @noEmit: true
// @checkJs: true
// @noTypesAndSymbols: true

// @Filename: /unmarked-esm.js
export default "unmarked-esm";

// @Filename: /marked-esm.mjs
export default "marked-esm";

// @Filename: /main1.js
import unmarked from "./unmarked-esm.js";
import marked from "./marked-esm.mjs";

// @Filename: /main2.js
const _1 = require("./unmarked-esm.js");
const _2 = require("./marked-esm.mjs");
