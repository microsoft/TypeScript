//// [genericInterfaceFunctionTypeParameter.ts]
export interface IFoo<A> { }
export function foo<A>(fn: (ifoo: IFoo<A>) => void) {
    foo(fn); // Invocation is necessary to repro (!)
}




//// [genericInterfaceFunctionTypeParameter.js]
define(["require", "exports"], function (require, exports) {
    function foo(fn) {
        foo(fn);
    }
    exports.foo = foo;
});
