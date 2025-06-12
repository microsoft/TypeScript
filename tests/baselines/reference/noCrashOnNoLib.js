//// [tests/cases/compiler/noCrashOnNoLib.ts] ////

//// [noCrashOnNoLib.ts]
export function f() {
    let e: {}[];
    while (true) {
      e = [...(e || [])];
    }
}

//// [noCrashOnNoLib.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() {
    let e;
    while (true) {
        e = [...(e || [])];
    }
}
