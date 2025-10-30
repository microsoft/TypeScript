declare namespace X { export interface bar { } }
declare module "m" {
    namespace X { export interface foo { } }
    export { X };
    export function foo(): X.foo;
    export function bar(): X.bar; // error
}