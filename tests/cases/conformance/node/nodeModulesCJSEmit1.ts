// @module: node18,nodenext
// @checkJs: true
// @outDir: dist
// @noTypesAndSymbols: true

// @Filename: /1.cjs
module.exports = {};

// @Filename: /2.cjs
exports.foo = 0;

// @Filename: /3.cjs
import "foo";
exports.foo = {};

// @Filename: /4.cjs
;

// @Filename: /5.cjs
import two from "./2.cjs";   // ok
import three from "./3.cjs"; // error
two.foo;
three.foo;
