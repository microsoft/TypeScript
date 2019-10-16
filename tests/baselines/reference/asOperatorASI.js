//// [asOperatorASI.ts]
class Foo { }
declare function as(...args: any[]);

// Example 1
var x = 10
as `Hello world`; // should not error

// Example 2
var y = 20
as(Foo); // should emit


//// [asOperatorASI.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
// Example 1
var x = 10;
as(templateObject__1984225119_1 || (templateObject__1984225119_1 = __makeTemplateObject(["Hello world"], ["Hello world"]))); // should not error
// Example 2
var y = 20;
as(Foo); // should emit
var templateObject__1984225119_1;
