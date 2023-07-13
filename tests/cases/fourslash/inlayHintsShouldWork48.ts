/// <reference path="fourslash.ts" />

//// declare function foo<T extends number>(t: T): T
//// const x = foo(1)

verify.baselineInlayHints(undefined, {
    includeInlayVariableTypeHints: true
});
