//// [tests/cases/compiler/breakTargetSameFunctionLabel.ts] ////

//// [breakTargetSameFunctionLabel.ts]
// Repro for https://github.com/microsoft/TypeScript/issues/30408
// The labels are declared in the same scope but do not enclose the
// break statements, so the errors should say so instead of claiming the
// jump targets cross a function boundary.
function foo() {
    for (let i = 0; i < 10; i++) {
        console.log(`${i}`);
        break loopend;
    }

    loopend:
    console.log('end of loop');
}

class C {
    static {
        for (let i = 0; i < 10; i++) {
            break done;
        }

        done:
        console.log('end');
    }
}


//// [breakTargetSameFunctionLabel.js]
"use strict";
// Repro for https://github.com/microsoft/TypeScript/issues/30408
// The labels are declared in the same scope but do not enclose the
// break statements, so the errors should say so instead of claiming the
// jump targets cross a function boundary.
function foo() {
    for (let i = 0; i < 10; i++) {
        console.log(`${i}`);
        break loopend;
    }
    loopend: console.log('end of loop');
}
class C {
}
(() => {
    for (let i = 0; i < 10; i++) {
        break done;
    }
    done: console.log('end');
})();
