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


//// [aliasInaccessibleModule.d.ts]
declare module M {
    export import X = N;
}


//// [DtsFileErrors]


==== tests/cases/compiler/aliasInaccessibleModule.d.ts (1 errors) ====
    declare module M {
        export import X = N;
        ~~~~~~~~~~~~~~~~~~~~
!!! Cannot find name 'N'.
    }
    