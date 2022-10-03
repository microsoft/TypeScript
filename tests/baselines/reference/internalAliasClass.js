//// [internalAliasClass.ts]
module a {
    export class c {
    }
}

module c {
    import b = a.c;
    export var x: b = new b();
}

//// [internalAliasClass.js]
var a;
(function (a) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    a.c = c;
})(a || (a = {}));
var c;
(function (c) {
    var b = a.c;
    c.x = new b();
})(c || (c = {}));


//// [internalAliasClass.d.ts]
declare module a {
    class c {
    }
}
declare module c {
    import b = a.c;
    var x: b;
}
