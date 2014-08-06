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
