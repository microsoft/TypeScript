// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: index.js
self.importScripts = (function (importScripts) {
    return function () {
        return importScripts.apply(this, arguments);
    };
})(importScripts);
