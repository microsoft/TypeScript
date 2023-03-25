//// [taggedTemplateWithAssertion.ts]
function assert(strings: TemplateStringsArray, condition: boolean): asserts condition {}

let a!: number | string;

if (typeof a === "string") {
  assert`uh-oh: ${false}`;
}

const b: number = a;


//// [taggedTemplateWithAssertion.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function assert(strings, condition) { }
var a;
if (typeof a === "string") {
    assert(__makeTemplateObject(["uh-oh: ", ""], ["uh-oh: ", ""]), false);
}
var b = a;
