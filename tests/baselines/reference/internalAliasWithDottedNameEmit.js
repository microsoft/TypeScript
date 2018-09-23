//// [internalAliasWithDottedNameEmit.ts]
module a.b.c {
      export var d;
}
module a.e.f {
      import g = b.c;
}


//// [internalAliasWithDottedNameEmit.js]
var a = a || (a = {});
(function (a) {
    var b = a.b || (a.b = {});
    (function (b) {
        var c = b.c || (b.c = {});
        (function (c) {
        })(c);
    })(b);
})(a);


//// [internalAliasWithDottedNameEmit.d.ts]
declare module a.b.c {
    var d: any;
}
declare module a.e.f {
}
