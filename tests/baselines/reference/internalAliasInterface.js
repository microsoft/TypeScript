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
    c.x;
})(c || (c = {}));


////[internalAliasInterface.d.ts]
declare module a {
    interface I {
    }
}
declare module c {
    var x: a.I;
}
