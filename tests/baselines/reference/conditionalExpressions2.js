//// [conditionalExpressions2.ts]
var a = false ? 1 : null;
var b = false ? undefined : 0;
var c = false ? 1 : 0;
var d = false ? false : true;
var e = false ? "foo" : "bar";
var f = false ? null : undefined;
var g = true ? {g:5} : null;
var h = [{h:5}, null];
function i() { if (true) { return { x: 5 }; } else { return null; } }

//// [conditionalExpressions2.js]
var a = false ? 1 : null;
var b = false ? undefined : 0;
var c = false ? 1 : 0;
var d = false ? false : true;
var e = false ? "foo" : "bar";
var f = false ? null : undefined;
var g = true ? { g: 5 } : null;
var h = [{ h: 5 }, null];
function i() { if (true) {
    return { x: 5 };
}
else {
    return null;
} }
