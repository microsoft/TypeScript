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
        }());
    })(N || (N = {}));
    var R = N;
    M.X = R;
})(M || (M = {}));
