//// [genericInterfaceFunctionTypeParameter.ts]
export interface IFoo<A> { }
export function foo<A>(fn: (ifoo: IFoo<A>) => void) {
    foo(fn); // Invocation is necessary to repro (!)
}




//// [genericInterfaceFunctionTypeParameter.js]
define(["require", "exports"], function(require, exports) {
    function foo(fn) {
        exports.foo(fn); // Invocation is necessary to repro (!)
    }
    exports.foo = foo;
});
