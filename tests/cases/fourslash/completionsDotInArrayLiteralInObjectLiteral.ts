/// <reference path="fourslash.ts" />

////const o = { x: [[|.|][||]/**/

const [r0, r1] = test.ranges();
verify.getSyntacticDiagnostics([
    { code: 1109, message: "Expression expected.", range: r0 },
    { code: 1003, message: "Identifier expected.", range: r1 },
]);

verify.completions({ marker: "", exact: undefined });
