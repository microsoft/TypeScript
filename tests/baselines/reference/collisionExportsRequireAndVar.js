//// [collisionExportsRequireAndVar.js]
define(["require", "exports"], function(require, exports) {
    function foo() {
    }
    exports.foo = foo;
    var exports = 1;
    var require = "require";
});
