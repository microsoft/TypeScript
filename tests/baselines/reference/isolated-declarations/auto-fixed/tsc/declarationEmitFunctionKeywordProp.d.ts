//// [tests/cases/compiler/declarationEmitFunctionKeywordProp.ts] ////

//// [declarationEmitFunctionKeywordProp.ts]
function foo(): void {}
foo.null = true;

function bar(): void {}
bar.async = true;
bar.normal = false;

function baz(): void {}
baz.class = true;
baz.normal = false;

/// [Declarations] ////



//// [declarationEmitFunctionKeywordProp.d.ts]
declare function foo(): void;
declare namespace foo {
    var _a: boolean;
    export { _a as null };
}
declare function bar(): void;
declare namespace bar {
    var async: boolean;
    var normal: boolean;
}
declare function baz(): void;
declare namespace baz {
    var _a: boolean;
    export var normal: boolean;
    export { _a as class };
}
//# sourceMappingURL=declarationEmitFunctionKeywordProp.d.ts.map