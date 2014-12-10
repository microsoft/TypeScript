//// [typeGuardsWithAny.ts]
var x: any = { p: 0 };
if (x instanceof Object) {
    x.p; // No error, type any unaffected by type guard
}
else {
    x.p; // No error, type any unaffected by type guard
}


//// [typeGuardsWithAny.js]
var x = { p: 0 };
if (x instanceof Object) {
    x.p; // No error, type any unaffected by type guard
}
else {
    x.p; // No error, type any unaffected by type guard
}
