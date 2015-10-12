//// [exportedBlockScopedDeclarations.ts]
const foo = foo; // compile error
export const bar = bar; // should be compile error
function f() {
  const bar = bar; // compile error
}
namespace NS {
  export const bar = bar; // should be compile error
}

//// [exportedBlockScopedDeclarations.js]
define(["require", "exports"], function (require, exports) {
    var foo = foo; // compile error
    exports.bar = exports.bar; // should be compile error
    function f() {
        var bar = bar; // compile error
    }
    var NS;
    (function (NS) {
        NS.bar = NS.bar; // should be compile error
    })(NS || (NS = {}));
});
