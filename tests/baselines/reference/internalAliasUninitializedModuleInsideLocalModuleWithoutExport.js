//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExport.ts]
export module a {
    export module b {
        export interface I {
            foo();
        }
    }
}

export module c {
    import b = a.b;
    export var x: b.I;
    x.foo();
}

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExport.js]
(function (c) {
    c.x;
    c.x.foo();
})(exports.c || (exports.c = {}));
var c = exports.c;


//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExport.d.ts]
export declare module a {
    module b {
        interface I {
            foo(): any;
        }
    }
}
export declare module c {
    var x: b.I;
}


//// [DtsFileErrors]


==== tests/cases/compiler/internalAliasUninitializedModuleInsideLocalModuleWithoutExport.d.ts (1 errors) ====
    export declare module a {
        module b {
            interface I {
                foo(): any;
            }
        }
    }
    export declare module c {
        var x: b.I;
               ~~~
!!! Cannot find name 'b'.
    }
    