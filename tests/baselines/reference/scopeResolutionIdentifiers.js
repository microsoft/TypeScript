//// [tests/cases/conformance/expressions/identifiers/scopeResolutionIdentifiers.ts] ////

//// [scopeResolutionIdentifiers.ts]
// EveryType used in a nested scope of a different EveryType with the same name, type of the identifier is the one defined in the inner scope

var s: string;
namespace M1 {
    export var s: number = 0;
    var n = s;
    var n: number;
}

namespace M2 {
    var s: number = 0;
    var n = s;
    var n: number;
}

function fn() {
    var s: boolean = false;
    var n = s;
    var n: boolean;
}

class C {
    s!: Date;
    n = this.s;
    x() {
        var p = this.n;
        var p: Date;
    }
}

namespace M3 {
    var s: any;
    namespace M4 {
        var n = s;
        var n: any;
    }
}


//// [scopeResolutionIdentifiers.js]
// EveryType used in a nested scope of a different EveryType with the same name, type of the identifier is the one defined in the inner scope
var s;
var M1;
(function (M1) {
    M1.s = 0;
    var n = M1.s;
    var n;
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    var s = 0;
    var n = s;
    var n;
})(M2 || (M2 = {}));
function fn() {
    var s = false;
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
