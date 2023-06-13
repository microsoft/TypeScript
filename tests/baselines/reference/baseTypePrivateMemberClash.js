//// [tests/cases/compiler/baseTypePrivateMemberClash.ts] ////

//// [baseTypePrivateMemberClash.ts]
class X {
    private m: number;
}
class Y {
    private m: string;
}

interface Z extends X, Y { }

//// [baseTypePrivateMemberClash.js]
var X = /** @class */ (function () {
    function X() {
    }
    return X;
}());
var Y = /** @class */ (function () {
    function Y() {
    }
    return Y;
}());
