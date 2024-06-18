/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////const u: unique symbol = Symbol();
////export const fn = () => ({ u } as const);

verify.codeFix({
    description:
`Add return type '{ readonly u: typeof u; }'` ,
    index: 0,
    newFileContent:
`const u: unique symbol = Symbol();
export const fn = (): {
    readonly u: typeof u;
} => ({ u } as const);`
});
