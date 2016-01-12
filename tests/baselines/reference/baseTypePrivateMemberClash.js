//// [baseTypePrivateMemberClash.ts]
class X {
    private m: number;
}
class Y {
    private m: string;
}

interface Z extends X, Y { }

//// [baseTypePrivateMemberClash.js]
var X = (function () {
    function X() {
    }
    return X;
}());
var Y = (function () {
    function Y() {
    }
    return Y;
}());
