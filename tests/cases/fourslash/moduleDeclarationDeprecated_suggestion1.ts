///<reference path="fourslash.ts" />
// @Filename: a.ts
////[|module|] mod1 { export let x: number }
////declare [|module|] mod2 { export let x: number }
////export [|module|] mod3 { export let x: number }
////export declare [|module|] mod4 { export let x: number }
////namespace mod5 { export let x: number }
////declare namespace mod6 { export let x: number }
////declare global {}
////mod1.x = 1;
////mod2.x = 1;
////mod5.x = 1;
////mod6.x = 1;

const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 1499,
        "message": "A namespace declaration should not be declared using the module keyword. Please use the namespace keyword instead.",
        "reportsDeprecated": true,
        "range": ranges[0]
    },
    {
        "code": 1499,
        "message": "A namespace declaration should not be declared using the module keyword. Please use the namespace keyword instead.",
        "reportsDeprecated": true,
        "range": ranges[1]
    },
    {
        "code": 1499,
        "message": "A namespace declaration should not be declared using the module keyword. Please use the namespace keyword instead.",
        "reportsDeprecated": true,
        "range": ranges[2]
    },
    {
        "code": 1499,
        "message": "A namespace declaration should not be declared using the module keyword. Please use the namespace keyword instead.",
        "reportsDeprecated": true,
        "range": ranges[3]
    },
])
