///<reference path="fourslash.ts" />

// @Filename: a.ts
////[|module|] mod1 { export let x: number }
////declare [|module|] mod2 { export let x: number }
////export [|module|] mod3 { export let x: number }
////export declare [|module|] mod4 { export let x: number }
////namespace mod5 { export let x: number }
////declare namespace mod6 { export let x: number }
////mod1.x = 1;
////mod2.x = 1;
////mod5.x = 1;
////mod6.x = 1;

// @Filename: b.ts
////declare module "global-ambient-module" {}

goTo.file("a.ts")
const errorDiagnostics = test.ranges().map(range => ({
    code: 1547,
    message: "The 'module' keyword is not allowed for namespace declarations. Use the 'namespace' keyword instead.",
    range,
}));
verify.getSemanticDiagnostics(errorDiagnostics)

goTo.file("b.ts")
verify.getSemanticDiagnostics([])