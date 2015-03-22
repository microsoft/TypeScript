//// [parserModifierOnStatementInBlock1.ts]
export function foo() {
   export var x = this;
}


//// [parserModifierOnStatementInBlock1.js]
function foo() {
    exports.x = this;
}
exports.foo = foo;
