///<reference path="fourslash.ts" />
// @Filename: a.ts
////[|module|] mod1 { export let x: number }
////declare [|module|] mod2 { export let x: number }
////export [|module|] mod3 { export let x: number }
////export declare [|module|] mod4 { export let x: number }
////namespace mod5 { export let x: number }
////declare namespace mod6 { export let x: number }
////declare module "module-augmentation" {}
////declare global {}
////mod1.x = 1;
////mod2.x = 1;
////mod5.x = 1;
////mod6.x = 1;

// @Filename: b.ts
////module "global-ambient-module" {}

goTo.file("a.ts")
const diagnostics = test.ranges().map(range => ({
    code: 1540,
    message: "A 'namespace' declaration should not be declared using the 'module' keyword. Please use the 'namespace' keyword instead.",
    reportsDeprecated: true,
    range,
}));
verify.getSuggestionDiagnostics(diagnostics)

goTo.file("b.ts")
verify.getSuggestionDiagnostics([])

