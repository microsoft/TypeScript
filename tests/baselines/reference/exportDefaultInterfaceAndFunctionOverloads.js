//// [tests/cases/compiler/exportDefaultInterfaceAndFunctionOverloads.ts] ////

//// [exportDefaultInterfaceAndFunctionOverloads.ts]
export default function foo(value: number): number
export default function foo(value: string): string
export default function foo(value: string | number): string | number {
    return 1
}
export default interface Foo {}


//// [exportDefaultInterfaceAndFunctionOverloads.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo;
function foo(value) {
    return 1;
}
