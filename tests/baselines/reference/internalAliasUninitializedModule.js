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
    c.x;
    c.x.foo();
})(c || (c = {}));


//// [internalAliasUninitializedModule.d.ts]
declare module a {
    module b {
        interface I {
            foo(): any;
        }
    }
}
declare module c {
    var x: b.I;
}


//// [DtsFileErrors]


==== tests/cases/compiler/internalAliasUninitializedModule.d.ts (1 errors) ====
    declare module a {
        module b {
            interface I {
                foo(): any;
            }
        }
    }
    declare module c {
        var x: b.I;
               ~~~
!!! Cannot find name 'b'.
    }
    