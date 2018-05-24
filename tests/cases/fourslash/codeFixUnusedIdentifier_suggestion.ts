/// <reference path='fourslash.ts' />

////function f([|p|]) {
////    const [|x|] = 0;
////}

const [r0, r1] = test.ranges();
verify.getSuggestionDiagnostics([
    {
        message: "'p' is declared but its value is never read.",
        range: r0,
        code: 6133,
        reportsUnnecessary: true,
    },
    {
        message: "'x' is declared but its value is never read.",
        range: r1,
        code: 6133,
        reportsUnnecessary: true,
    }
]);

verify.codeFixAvailable(
    ["Remove declaration for: 'p'", "Prefix 'p' with an underscore", "Remove declaration for: 'x'"]
        .map(description => ({ description })));
