//// [tests/cases/compiler/aliasInaccessibleModule2.ts] ////

//// [aliasInaccessibleModule2.ts]
module M {
    module N {
        class C {
        }
        
    }
    import R = N;
    export import X = R;
}

//// [aliasInaccessibleModule2.js]
var M;
(function (M) {
    let N;
    (function (N) {
        class C {
        }
    })(N || (N = {}));
    var R = N;
    M.X = R;
})(M || (M = {}));
