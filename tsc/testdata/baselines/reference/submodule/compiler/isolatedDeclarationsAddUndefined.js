//// [tests/cases/compiler/isolatedDeclarationsAddUndefined.ts] ////

//// [file1.ts]
type N = 1;
export class Bar {
    c? = [2 as N] as const;
    c3? = 1 as N;
    readonly r = 1;
    f = 2;
}

//// [file2.ts]
export function foo(p = (ip = 10, v: number): void => {}): void{
}
type T = number
export function foo2(p = (ip = 10 as T, v: number): void => {}): void{}
export class Bar2 {
    readonly r = 1;
    f = 2;
}

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
class Bar {
    c = [2];
    c3 = 1;
    r = 1;
    f = 2;
}
exports.Bar = Bar;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar2 = void 0;
exports.foo = foo;
exports.foo2 = foo2;
function foo(p = (ip = 10, v) => { }) {
}
function foo2(p = (ip = 10, v) => { }) { }
class Bar2 {
    r = 1;
    f = 2;
}
exports.Bar2 = Bar2;
