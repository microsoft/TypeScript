//// [tests/cases/conformance/expressions/identifiers/scopeResolutionIdentifiers.ts] ////

//// [scopeResolutionIdentifiers.ts]
// EveryType used in a nested scope of a different EveryType with the same name, type of the identifier is the one defined in the inner scope

var s: string;
module M1 {
    export var s: number;
    var n = s;
    var n: number;
}

module M2 {
    var s: number;
    var n = s;
    var n: number;
}

function fn() {
    var s: boolean;
    var n = s;
    var n: boolean;
}

class C {
    s: Date;
    n = this.s;
    x() {
        var p = this.n;
        var p: Date;
    }
}

module M3 {
    var s: any;
    module M4 {
        var n = s;
        var n: any;
    }
}


//// [scopeResolutionIdentifiers.js]
// EveryType used in a nested scope of a different EveryType with the same name, type of the identifier is the one defined in the inner scope
var s;
var M1;
(function (M1) {
    var n = M1.s;
    var n;
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    var s;
    var n = s;
    var n;
})(M2 || (M2 = {}));
function fn() {
    var s;
    var n = s;
    var n;
}
var C = /** @class */ (function () {
    function C() {
        this.n = this.s;
    }
    C.prototype.x = function () {
        var p = this.n;
        var p;
    };
    return C;
}());
var M3;
(function (M3) {
    var s;
    var M4;
    (function (M4) {
        var n = s;
        var n;
    })(M4 || (M4 = {}));
})(M3 || (M3 = {}));
