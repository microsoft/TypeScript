/// <reference path='fourslash.ts' />

//// interface A {
////     a: () => number
//// }
//// 
//// let b: A = {
////     a: () => { 1 }
//// }

verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_a_return_statement.message },
    { description: ts.Diagnostics.Remove_braces_from_arrow_function_body.message }
]);
