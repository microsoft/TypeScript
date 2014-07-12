//// [collisionExportsRequireAndAlias_file1.js]
define(["require", "exports"], function(require, exports) {
    function bar() {
    }
    exports.bar = bar;
});
//// [collisionExportsRequireAndAlias_file11.js]
define(["require", "exports"], function(require, exports) {
    function bar2() {
    }
    exports.bar2 = bar2;
});
//// [collisionExportsRequireAndAlias_file2.js]
define(["require", "exports", 'collisionExportsRequireAndAlias_file1', 'collisionExportsRequireAndAlias_file11'], function(require, exports, require, exports) {
    function foo() {
        require.bar();
    }
    exports.foo = foo;
    function foo2() {
        exports.bar2();
    }
    exports.foo2 = foo2;
});
