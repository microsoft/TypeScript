//// [tests/cases/compiler/exportSpecifierForAGlobal.ts] ////

//// [a.d.ts]
declare class X { }

//// [b.ts]
export {X};
export function f() {
    var x: X;
    return x;
} 


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = void 0;
exports.f = f;
function f() {
    var x;
    return x;
}


//// [b.d.ts]
export { X };
export declare function f(): X;
