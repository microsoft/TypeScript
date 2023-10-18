//// [tests/cases/conformance/expressions/asOperator/asOperator3.ts] ////

//// [asOperator3.ts]
declare function tag(...x: any[]): any;

var a = `${123 + 456 as number}`;
var b = `leading ${123 + 456 as number}`;
var c = `${123 + 456 as number} trailing`;
var d = `Hello ${123} World` as string;
var e = `Hello` as string;
var f = 1 + `${1} end of string` as string;
var g = tag `Hello ${123} World` as string;
var h = tag `Hello` as string;

//// [asOperator3.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var a = "".concat(123 + 456);
var b = "leading ".concat(123 + 456);
var c = "".concat(123 + 456, " trailing");
var d = "Hello ".concat(123, " World");
var e = "Hello";
var f = 1 + "".concat(1, " end of string");
var g = tag(__makeTemplateObject(["Hello ", " World"], ["Hello ", " World"]), 123);
var h = tag(__makeTemplateObject(["Hello"], ["Hello"]));
