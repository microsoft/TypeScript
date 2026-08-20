//// [tests/cases/compiler/noCrashOnNoLib.ts] ////

//// [noCrashOnNoLib.ts]
export function f() {
    let e: {}[] = [];
    while (true) {
      e = [...(e || [])];
    }
}

//// [noCrashOnNoLib.js]
export function f() {
    let e = [];
    while (true) {
        e = [...(e || [])];
    }
}
