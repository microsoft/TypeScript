//// [aliasInaccessibleModule.ts]
module M {
    module N {
    }
    export import X = N;
}

//// [aliasInaccessibleModule.js]
var M;
(function (M) {
})(M || (M = {}));
