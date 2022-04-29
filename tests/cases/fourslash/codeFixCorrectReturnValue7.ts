/// <reference path='fourslash.ts' />

//// function Foo (a: () => number) { a() }
//// Foo(() => { 1 })

verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_a_return_statement.message },
    { description: ts.Diagnostics.Remove_braces_from_arrow_function_body.message }
]);
