// @treatWarningsAsErrors: false
// @noUnusedLocals: true
// @noUnusedParameters: true
// @noImplicitReturns: true
// @noFallthroughCasesInSwitch: true
// @allowUnusedLabels: false
// @allowUnreachableCode: false
function foo(p: any): string { // unused parameter
    foo: while (false) {} // unused label

    const x: { kind: "a" } | { kind: "b" } = { kind: "a" };
    const y = "any"; // unused variable
    switch (x.kind) {
        case "a":
            void x; // implicit fallthrough
        case "b":
            return; // implicit return
            if (x === x) { // unreachable code
                void x;
            }
    }
}