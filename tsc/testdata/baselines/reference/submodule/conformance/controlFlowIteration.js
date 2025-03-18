//// [tests/cases/conformance/controlFlow/controlFlowIteration.ts] ////

//// [controlFlowIteration.ts]
let cond: boolean;

function ff() {
    let x: string | undefined;
    while (true) {
        if (cond) {
            x = "";
        }
        else {
            if (x) {
                x.length;
            }
            if (x) {
                x.length;
            }
        }
    }
}


//// [controlFlowIteration.js]
let cond;
function ff() {
    let x;
    while (true) {
        if (cond) {
            x = "";
        }
        else {
            if (x) {
                x.length;
            }
            if (x) {
                x.length;
            }
        }
    }
}
