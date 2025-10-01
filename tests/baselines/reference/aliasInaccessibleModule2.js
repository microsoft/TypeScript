//// [tests/cases/compiler/aliasInaccessibleModule2.ts] ////

//// [aliasInaccessibleModule2.ts]
namespace M {
    namespace N {
        class C {
        }
        
    }
    import R = N;
    export import X = R;
}

//// [aliasInaccessibleModule2.js]
var M;
(function (M) {
    var N;
    (function (N) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
    })(N || (N = {}));
    var R = N;
    M.X = R;
})(M || (M = {}));


//// [aliasInaccessibleModule2.d.ts]
declare namespace M {
    namespace N {
    }
    import R = N;
    export import X = R;
    export {};
}
