//// [parserModifierOnStatementInBlock3.ts]
export function foo() {
   export function bar() {
   }
}


//// [parserModifierOnStatementInBlock3.js]
function foo() {
    function bar() {
    }
    exports.bar = bar;
}
exports.foo = foo;
