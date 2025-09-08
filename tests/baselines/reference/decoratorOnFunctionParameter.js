//// [tests/cases/conformance/decorators/invalid/decoratorOnFunctionParameter.ts] ////

//// [decoratorOnFunctionParameter.ts]
declare const dec: any;

class C { n = true; }

function direct(@dec this: C) { return this.n; }
function called(@dec() this: C) { return this.n; }

//// [decoratorOnFunctionParameter.js]
class C {
    n = true;
}
function direct() { return this.n; }
function called() { return this.n; }
