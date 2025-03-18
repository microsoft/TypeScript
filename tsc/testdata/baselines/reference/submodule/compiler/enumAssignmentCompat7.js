//// [tests/cases/compiler/enumAssignmentCompat7.ts] ////

//// [enumAssignmentCompat7.ts]
namespace first {
    export enum E { A = 1 }
}

namespace second {
    export enum E { A = 2 }
}

class Base {
    method(param: first.E) {

    }
}

class Derived extends Base {
    override method(param: second.E) {
    }
}

function overloadingFunction(): first.E
function overloadingFunction(): second.E {
    return second.E.B
}

//// [enumAssignmentCompat7.js]
var first;
(function (first) {
    let E;
    (function (E) {
        E[E["A"] = 1] = "A";
    })(E = first.E || (first.E = {}));
})(first || (first = {}));
var second;
(function (second) {
    let E;
    (function (E) {
        E[E["A"] = 2] = "A";
    })(E = second.E || (second.E = {}));
})(second || (second = {}));
class Base {
    method(param) {
    }
}
class Derived extends Base {
    method(param) {
    }
}
function overloadingFunction() {
    return second.E.B;
}
