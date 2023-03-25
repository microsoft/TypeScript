//// [taggedTemplateWithNeverReturnType.ts]
function fail(strings?: TemplateStringsArray): never {
  throw "";
}

let a!: number | string;

if (typeof a === "string") {
  fail``;
}

const b: number = a;


//// [taggedTemplateWithNeverReturnType.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function fail(strings) {
    throw "";
}
var a;
if (typeof a === "string") {
    fail(__makeTemplateObject([""], [""]));
}
var b = a;
