//// [tests/cases/compiler/errorsForCallAndAssignmentAreSimilar.ts] ////

//// [errorsForCallAndAssignmentAreSimilar.ts]
function minimalExample1() {
    type Disc =
        | { kind: "hddvd" }
        | { kind: "bluray" }

    function foo(x: Disc[]) {
    }

    foo([
        { kind: "bluray", },
        { kind: "hdpvd", }
    ]);

    const ds: Disc[] = [
        { kind: "bluray", },
        { kind: "hdpvd", }
    ];
}

//// [errorsForCallAndAssignmentAreSimilar.js]
function minimalExample1() {
    function foo(x) {
    }
    foo([
        { kind: "bluray", },
        { kind: "hdpvd", }
    ]);
    var ds = [
        { kind: "bluray", },
        { kind: "hdpvd", }
    ];
}
