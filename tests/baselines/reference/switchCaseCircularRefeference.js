//// [switchCaseCircularRefeference.ts]
// Repro from #9507

function f(x: {a: "A", b} | {a: "C", e}) {
    switch (x.a) {
    case x:
        break;
    }
}

//// [switchCaseCircularRefeference.js]
// Repro from #9507
function f(x) {
    switch (x.a) {
        case x:
            break;
    }
}
