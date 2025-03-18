//// [tests/cases/compiler/continueInLoopsWithCapturedBlockScopedBindings1.ts] ////

//// [continueInLoopsWithCapturedBlockScopedBindings1.ts]
function foo() {
    for (const i of [0, 1]) {
        if (i === 0) {
            continue;
        }

        // Trigger non-simple-loop emit
        (() => {
            return i;
        })();
    }
}

//// [continueInLoopsWithCapturedBlockScopedBindings1.js]
function foo() {
    for (const i of [0, 1]) {
        if (i === 0) {
            continue;
        }
        (() => {
            return i;
        })();
    }
}
