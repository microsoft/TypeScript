//// [partiallyAmbientClodule.ts]
declare module foo {
    export function x(): any;
}
class foo { } // Legal, because module is ambient

//// [partiallyAmbientClodule.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}()); // Legal, because module is ambient
