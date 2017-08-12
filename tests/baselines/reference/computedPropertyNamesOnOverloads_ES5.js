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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1[methodName] = function (v) { };
    return C;
}());
