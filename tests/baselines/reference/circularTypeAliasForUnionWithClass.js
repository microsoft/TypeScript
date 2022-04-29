//// [circularTypeAliasForUnionWithClass.ts]
var v0: T0;
type T0 = string | I0;
class I0 {
    x: T0;
}

var v3: T3;
type T3 = string | I3;
class I3 {
    [x: number]: T3;
}

var v4: T4;
type T4 = string | I4;
class I4 {
    [x: string]: T4;
}


//// [circularTypeAliasForUnionWithClass.js]
var v0;
var I0 = /** @class */ (function () {
    function I0() {
    }
    return I0;
}());
var v3;
var I3 = /** @class */ (function () {
    function I3() {
    }
    return I3;
}());
var v4;
var I4 = /** @class */ (function () {
    function I4() {
    }
    return I4;
}());
