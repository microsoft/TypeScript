//// [exportSpecifierReferencingOuterDeclaration3.ts]
declare module X { export interface bar { } }
declare module "m" {
    module X { export interface foo { } }
    export { X };
    export function foo(): X.foo;
    export function bar(): X.bar; // error
}

//// [exportSpecifierReferencingOuterDeclaration3.js]
