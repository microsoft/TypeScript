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
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
var a = "" + (123 + 456);
var b = "leading " + (123 + 456);
var c = 123 + 456 + " trailing";
var d = "Hello " + 123 + " World";
var e = "Hello";
var f = 1 + (1 + " end of string");
var g = tag(_a || (_a = __getTemplateObject(["Hello ", " World"], ["Hello ", " World"])), 123);
var h = tag(_b || (_b = __getTemplateObject(["Hello"], ["Hello"])));
var _a, _b;
