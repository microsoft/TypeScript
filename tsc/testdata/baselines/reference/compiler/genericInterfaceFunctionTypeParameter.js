//// [tests/cases/compiler/genericInterfaceFunctionTypeParameter.ts] ////

//// [genericInterfaceFunctionTypeParameter.ts]
export interface IFoo<A> { }
export function foo<A>(fn: (ifoo: IFoo<A>) => void) {
    foo(fn); // Invocation is necessary to repro (!)
}




//// [genericInterfaceFunctionTypeParameter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo(fn) {
    foo(fn); // Invocation is necessary to repro (!)
}
