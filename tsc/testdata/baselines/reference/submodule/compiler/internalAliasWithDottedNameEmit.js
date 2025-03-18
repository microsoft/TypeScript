//// [tests/cases/compiler/internalAliasWithDottedNameEmit.ts] ////

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
    let b;
    (function (b) {
        let c;
        (function (c) {
        })(c = b.c || (b.c = {}));
    })(b = a.b || (a.b = {}));
})(a || (a = {}));
