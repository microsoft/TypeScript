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
    (function (b) {
        (function (c) {
            c.d;
        })(b.c || (b.c = {}));
        var c = b.c;
    })(a.b || (a.b = {}));
    var b = a.b;
})(a || (a = {}));
var a;
(function (a) {
    (function (e) {
        (function (f) {
        })(e.f || (e.f = {}));
        var f = e.f;
    })(a.e || (a.e = {}));
    var e = a.e;
})(a || (a = {}));
