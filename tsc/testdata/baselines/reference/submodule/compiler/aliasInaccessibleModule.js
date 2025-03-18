//// [tests/cases/compiler/aliasInaccessibleModule.ts] ////

//// [aliasInaccessibleModule.ts]
module M {
    module N {
    }
    export import X = N;
}

//// [aliasInaccessibleModule.js]
var M;
(function (M) {
    M.X = N;
})(M || (M = {}));
