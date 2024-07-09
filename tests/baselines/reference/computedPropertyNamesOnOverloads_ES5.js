//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesOnOverloads_ES5.ts] ////

//// [computedPropertyNamesOnOverloads_ES5.ts]
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName](v: string);
    [methodName]();
    [methodName](v?: string) { }
}

//// [computedPropertyNamesOnOverloads_ES5.js]
var methodName = "method";
var accessorName = "accessor";
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[methodName] = function (v) { };
    return C;
}());
