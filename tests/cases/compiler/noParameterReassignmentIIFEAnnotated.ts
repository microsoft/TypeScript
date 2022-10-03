// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: index.js
self.importScripts = (function (importScripts) {
    /**
     * @param {...unknown} rest
     */
    return function () {
        return importScripts.apply(this, arguments);
    };
})(importScripts);
