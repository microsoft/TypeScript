/// <reference path="./fourslash.ts" />

// @module: commonjs
// @checkJs: true

// @Filename: ./library.js
//// module.exports.aaa = function() {}
//// module.exports.bbb = function() {}

// @Filename: ./foo.js
//// var aaa = require("./library.js").aaa;
//// aaa();
//// /*$*/bbb

goTo.marker("$")
verify.codeFixAvailable([
    { description: "Add import from \"./library.js\"" },
    { description: "Ignore this error message" },
    { description: "Disable checking for this file" },
    { description: "Convert to ES module" },
]);
