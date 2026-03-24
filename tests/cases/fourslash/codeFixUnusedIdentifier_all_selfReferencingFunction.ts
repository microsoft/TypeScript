/// <reference path='fourslash.ts' />

//// function fibonacci(n: number): number {
////   if (n <= 1) {
////     return n;
////   }
////   return fibonacci(n - 1) + fibonacci(n - 2);
//// }
//// 
//// function other() {}
////
//// export {};

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_declarations.message,
    newFileContent: "\n\nexport {};",
});
