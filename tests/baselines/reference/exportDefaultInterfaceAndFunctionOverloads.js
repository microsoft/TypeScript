//// [exportDefaultInterfaceAndFunctionOverloads.ts]
export default function foo(value: number): number
export default function foo(value: string): string
export default function foo(value: string | number): string | number {
    return 1
}
export default interface Foo {}


//// [exportDefaultInterfaceAndFunctionOverloads.js]
"use strict";
exports.__esModule = true;
function foo(value) {
    return 1;
}
exports["default"] = foo;
