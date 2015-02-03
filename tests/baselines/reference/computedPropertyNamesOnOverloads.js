//// [computedPropertyNamesOnOverloads.ts]
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName](v: string);
    [methodName]();
    [methodName](v?: string) { }
}

//// [computedPropertyNamesOnOverloads.js]
var methodName = "method";
var accessorName = "accessor";
var C = (function () {
    function C() {
    }
    C.prototype[methodName] = function (v) {
    };
    return C;
})();
