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
    var N;
    (function (N) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
    })(N || (N = {}));
    var R = N;
    M.X = R;
})(M || (M = {}));


//// [aliasInaccessibleModule2.d.ts]
declare module M {
    export import X = R;
}


//// [DtsFileErrors]


==== tests/cases/compiler/aliasInaccessibleModule2.d.ts (1 errors) ====
    declare module M {
        export import X = R;
        ~~~~~~~~~~~~~~~~~~~~
!!! Cannot find name 'R'.
    }
    