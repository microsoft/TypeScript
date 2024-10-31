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
//// /**/

verify.completions({
  marker: "",
  includes: [
    {
      name: "Dottie",
      hasAction: true,
      source: "/node_modules/dottie/dottie",
      sortText: completion.SortText.AutoImportSuggestions,
    },
  ],
  preferences: { includeCompletionsForModuleExports: true },
});
