/// <reference path="fourslash.ts" />

// @moduleResolution: node
// @allowJs: true
// @checkJs: true

// @Filename: /node_modules/dottie/package.json
//// {
////   "name": "dottie",
////   "main": "dottie.js"
//// }

// @Filename: /node_modules/dottie/dottie.js
//// (function (undefined) {
////   var root = this;
////
////   var Dottie = function () {};
////
////   Dottie["default"] = function (object, path, value) {};
////
////   if (typeof module !== "undefined" && module.exports) {
////     exports = module.exports = Dottie;
////   } else {
////     root["Dottie"] = Dottie;
////     root["Dot"] = Dottie;
////
////     if (typeof define === "function") {
////       define([], function () {
////         return Dottie;
////       });
////     }
////   }
//// })();

// @Filename: /src/index.js
//// import Dottie from 'dottie';
//// /**/

verify.completions({
  marker: "",
  includes: [{ name: "Dottie" }],
  preferences: { includeCompletionsForModuleExports: true },
});
