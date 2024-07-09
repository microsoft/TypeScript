//// [tests/cases/compiler/declFileModuleWithPropertyOfTypeModule.ts] ////

//// [declFileModuleWithPropertyOfTypeModule.ts]
module m {
    export class c {
    }

    export var a = m;
}

//// [declFileModuleWithPropertyOfTypeModule.js]
var m;
(function (m) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    m.c = c;
    m.a = m;
})(m || (m = {}));


//// [declFileModuleWithPropertyOfTypeModule.d.ts]
declare namespace m {
    class c {
    }
    var a: typeof m;
}
