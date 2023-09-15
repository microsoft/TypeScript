//// [tests/cases/compiler/declFileModuleAssignmentInObjectLiteralProperty.ts] ////

//// [declFileModuleAssignmentInObjectLiteralProperty.ts]
module m1 {
    export class c {
    }
}
var d = {
    m1: { m: m1 },
    m2: { c: m1.c },
};

//// [declFileModuleAssignmentInObjectLiteralProperty.js]
var m1;
(function (m1) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    m1.c = c;
})(m1 || (m1 = {}));
var d = {
    m1: { m: m1 },
    m2: { c: m1.c },
};


//// [declFileModuleAssignmentInObjectLiteralProperty.d.ts]
declare namespace m1 {
    class c {
    }
}
declare var d: {
    m1: {
        m: typeof m1;
    };
    m2: {
        c: typeof m1.c;
    };
};
