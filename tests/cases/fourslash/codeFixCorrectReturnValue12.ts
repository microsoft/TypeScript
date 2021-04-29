/// <reference path='fourslash.ts' />
//// interface A {
////     bar: string
//// }
//// 
//// function Foo (a: () => A) { a() }
//// Foo(() => {  
////     { bar: '123' }
//// })

verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_a_return_statement.message },
    { description: ts.Diagnostics.Remove_braces_from_arrow_function_body.message },
    { description: ts.Diagnostics.Remove_unused_label.message }
]);
