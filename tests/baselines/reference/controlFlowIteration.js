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
var cond;
function ff() {
    var x;
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
