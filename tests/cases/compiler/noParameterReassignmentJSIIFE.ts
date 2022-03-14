// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: index.js
"use strict";

self.importScripts = (function (importScripts) {
  return function () {
    setTimeout(function () {}, 0);
    return importScripts.apply(this, arguments);
  };
})(importScripts);

importScripts("../node_modules/systemjs/dist/system.js");
importScripts("../systemjs.config.js");

SystemJS.import("pdfjs/core/worker.js").then(function () {
    // Worker is loaded at this point.
});