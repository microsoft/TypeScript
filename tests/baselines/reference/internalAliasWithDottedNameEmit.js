//// [internalAliasWithDottedNameEmit.ts]
module a.b.c {
      export var d;
}
module a.e.f {
      import g = b.c;
}


//// [internalAliasWithDottedNameEmit.js]
var a;
(function (a) {
    var b;
    (function (b) {
        var c;
        (function (c) {
        })(c = b.c || (b.c = {}));
    })(b = a.b || (a.b = {}));
})(a || (a = {}));


//// [internalAliasWithDottedNameEmit.d.ts]
declare module a.b.c {
    var d: any;
}
declare module a.e.f {
}
