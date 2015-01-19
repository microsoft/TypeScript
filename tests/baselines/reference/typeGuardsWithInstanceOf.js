//// [typeGuardsWithInstanceOf.ts]
interface I { global: string; }
var result: I;
var result2: I;

if (!(result instanceof RegExp)) {
    result = result2;
} else if (!result.global) {
}

//// [typeGuardsWithInstanceOf.js]
var result;
var result2;
if (!(result instanceof RegExp)) {
    result = result2;
}
else if (!result.global) {
}
