//// [regexValidated.declarations.ts]
type Apple = /apple/i;
export type Banana = /banana/i;
const x = {
    a: "apple" as Apple,
    b: "banana" as Banana,
    c: "banana" as /banana/i
}
export default x;

//// [regexValidated.declarations.js]
"use strict";
exports.__esModule = true;
var x = {
    a: "apple",
    b: "banana",
    c: "banana"
};
exports["default"] = x;


//// [regexValidated.declarations.d.ts]
export declare type Banana = /banana/i;
declare const x: {
    a: /apple/i;
    b: Banana;
    c: Banana;
};
export default x;
