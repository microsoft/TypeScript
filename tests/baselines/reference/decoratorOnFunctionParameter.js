//// [decoratorOnFunctionParameter.ts]
declare const dec: any;

class C { n = true; }

function direct(@dec this: C) { return this.n; }
function called(@dec() this: C) { return this.n; }

//// [decoratorOnFunctionParameter.js]
var C = /** @class */ (function () {
    function C() {
        this.n = true;
    }
    return C;
}());
function direct() { return this.n; }
function called() { return this.n; }
