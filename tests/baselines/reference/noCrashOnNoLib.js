//// [noCrashOnNoLib.ts]
export function f() {
    let e: {}[];
    while (true) {
      e = [...(e || [])];
    }
}

//// [noCrashOnNoLib.js]
"use strict";
exports.__esModule = true;
function f() {
    var e;
    while (true) {
        e = (e || []).slice();
    }
}
exports.f = f;
