// @target: es2015
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitThis: false
// @filename: index.js
self.importScripts = (function (importScripts) {
    return function () {
        return importScripts.apply(this, arguments);
    };
})(importScripts);
