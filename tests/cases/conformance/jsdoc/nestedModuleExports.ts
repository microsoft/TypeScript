// @noEmit: true
// @checkJs: true
// @allowJs: true

// @Filename: not-iife.js
var ShouldBeGlobal = 0;
function f(type, ctor, exports) {
    if (typeof exports !== "undefined") {
        exports.a = ctor;
        module.exports.b = ctor;
        module.exports = { ctor };
        exports = { ctor };
        module.exports["c"] = type;
    }
}

// @Filename: iife.js
var ShouldNotBeGlobal = 0;
(function () {
    exports.a = "b";
})();

// @Filename: test.js
ShouldBeGlobal;
ShouldNotBeGlobal;
