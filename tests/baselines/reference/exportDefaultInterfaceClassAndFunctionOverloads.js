//// [tests/cases/compiler/exportDefaultInterfaceClassAndFunctionOverloads.ts] ////

//// [exportDefaultInterfaceClassAndFunctionOverloads.ts]
export default function foo(value: number): number
export default function foo(value: string): string
export default function foo(value: string | number): string | number {
    return 1
}
declare class Foo {}
export default Foo
export default interface Bar {}


//// [exportDefaultInterfaceClassAndFunctionOverloads.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo;
function foo(value) {
    return 1;
}
exports.default = Foo;
