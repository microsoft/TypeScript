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
var Bar = /** @class */ (function () {
    function Bar() {
        this.c = [2];
        this.c3 = 1;
        this.r = 1;
        this.f = 2;
    }
    return Bar;
}());
exports.Bar = Bar;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar2 = void 0;
exports.foo = foo;
exports.foo2 = foo2;
function foo(p) {
    if (p === void 0) { p = function (ip, v) {
        if (ip === void 0) { ip = 10; }
    }; }
}
function foo2(p) {
    if (p === void 0) { p = function (ip, v) {
        if (ip === void 0) { ip = 10; }
    }; }
}
var Bar2 = /** @class */ (function () {
    function Bar2() {
        this.r = 1;
        this.f = 2;
    }
    return Bar2;
}());
exports.Bar2 = Bar2;


//// [file1.d.ts]
type N = 1;
export declare class Bar {
    c?: readonly [1] | undefined;
    c3?: N;
    readonly r = 1;
    f: number;
}
export {};
