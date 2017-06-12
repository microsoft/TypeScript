//// [computedPropertyNames23_ES5.ts]
class C {
    bar() {
        return 0;
    }
    [
        { [this.bar()]: 1 }[0]
    ]() { }
}

//// [computedPropertyNames23_ES5.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.bar = function () {
        return 0;
    };
    proto_1[(_a = {}, _a[this.bar()] = 1, _a)[0]] = function () { };
    return C;
    var _a;
}());
