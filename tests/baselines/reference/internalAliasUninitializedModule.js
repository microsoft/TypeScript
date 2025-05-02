//// [tests/cases/compiler/internalAliasUninitializedModule.ts] ////

//// [internalAliasUninitializedModule.ts]
module a {
    export module b {
        export interface I {
            foo();
        }
    }
}

module c {
    import b = a.b;
    export var x: b.I;
    x.foo();
}

//// [internalAliasUninitializedModule.js]
var c;
(function (c) {
    c.x.foo();
})(c || (c = {}));


//// [internalAliasUninitializedModule.d.ts]
declare namespace a {
    namespace b {
        interface I {
            foo(): any;
        }
    }
}
declare namespace c {
    import b = a.b;
    var x: b.I;
}
