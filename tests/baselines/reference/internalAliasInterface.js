//// [tests/cases/compiler/internalAliasInterface.ts] ////

//// [internalAliasInterface.ts]
module a {
    export interface I {
    }
}

module c {
    import b = a.I;
    export var x: b;
}


//// [internalAliasInterface.js]
var c;
(function (c) {
})(c || (c = {}));


//// [internalAliasInterface.d.ts]
declare namespace a {
    interface I {
    }
}
declare namespace c {
    import b = a.I;
    var x: b;
}
