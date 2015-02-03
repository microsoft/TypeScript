//// [computedPropertyNamesOnOverloads_ES6.ts]
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName](v: string);
    [methodName]();
    [methodName](v?: string) { }
}

//// [computedPropertyNamesOnOverloads_ES6.js]
var methodName = "method";
var accessorName = "accessor";
var C = (function () {
    function C() {
    }
    C.prototype[methodName] = function (v) {
    };
    return C;
})();
