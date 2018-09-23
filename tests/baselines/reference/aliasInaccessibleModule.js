//// [aliasInaccessibleModule.ts]
module M {
    module N {
    }
    export import X = N;
}

//// [aliasInaccessibleModule.js]
var M = M || (M = {});
(function (M) {
})(M);


//// [aliasInaccessibleModule.d.ts]
declare module M {
    module N {
    }
    export import X = N;
}
