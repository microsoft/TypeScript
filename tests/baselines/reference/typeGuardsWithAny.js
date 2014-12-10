//// [typeGuardsWithAny.ts]
var x: any = { p: 0 };
if (x instanceof Object) {
    x.p; // No error, type any is not narrowed
}


//// [typeGuardsWithAny.js]
var x = { p: 0 };
if (x instanceof Object) {
    x.p; // No error, type any is not narrowed
}
