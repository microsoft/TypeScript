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
declare module a {
    interface I {
    }
}
declare module c {
    import b = a.I;
    var x: b;
}
