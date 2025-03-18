//// [tests/cases/compiler/cloduleWithDuplicateMember2.ts] ////

//// [cloduleWithDuplicateMember2.ts]
class C {
    set x(y) { }
    static set y(z) { }
}

module C {
    export var x = 1;
}
module C {
    export function x() { }
}

//// [cloduleWithDuplicateMember2.js]
class C {
    set x(y) { }
    static set y(z) { }
}
(function (C) {
    C.x = 1;
})(C || (C = {}));
(function (C) {
    function x() { }
    C.x = x;
})(C || (C = {}));
