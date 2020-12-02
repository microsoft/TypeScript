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
exports.__esModule = true;
exports.f = exports.X = void 0;
function f() {
    var x;
    return x;
}
exports.f = f;


//// [b.d.ts]
export { X };
export declare function f(): X;
