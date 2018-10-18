//// [overloadOnConstInCallback1.ts]
class C {
    x1(a: number, callback: (x: 'hi') => number); // error
    x1(a: number, callback: (x: any) => number) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
    }
}

//// [overloadOnConstInCallback1.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.x1 = function (a, callback) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
    };
    return C;
}());
