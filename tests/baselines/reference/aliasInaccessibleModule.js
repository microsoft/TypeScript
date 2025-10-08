//// [tests/cases/compiler/aliasInaccessibleModule.ts] ////

//// [aliasInaccessibleModule.ts]
namespace M {
    namespace N {
    }
    export import X = N;
}

//// [aliasInaccessibleModule.js]
var M;
(function (M) {
})(M || (M = {}));


//// [aliasInaccessibleModule.d.ts]
declare namespace M {
    namespace N {
    }
    export import X = N;
    export {};
}
