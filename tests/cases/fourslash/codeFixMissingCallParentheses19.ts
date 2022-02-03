/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
////const a = { b: () => {} }
////[|a.b;|]

verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_missing_call_parentheses.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_missing_call_parentheses.message,
    index: 0,
    newRangeContent: `a.b();`,
});
