//// [internalAliasVar.ts]
module a {
    export var x = 10;
}

module c {
    import b = a.x;
    export var bVal = b;
}


//// [internalAliasVar.js]
var a = a || (a = {});
(function (a) {
    a.x = 10;
})(a);
var c = c || (c = {});
(function (c) {
    var b = a.x;
    c.bVal = b;
})(c);


//// [internalAliasVar.d.ts]
declare module a {
    var x: number;
}
declare module c {
    var bVal: number;
}
