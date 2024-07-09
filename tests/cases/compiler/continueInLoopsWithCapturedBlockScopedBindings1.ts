// @target: ES5
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