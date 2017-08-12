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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.x1 = function (a, callback) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
    };
    return C;
}());
