/// <reference path='../fourslash.ts' />

// @Filename: signatureHelpInFunctionCallOnFunctionDeclarationInMultipleFiles_file0.ts
////declare function fn(x: string, y: number);

// @Filename: signatureHelpInFunctionCallOnFunctionDeclarationInMultipleFiles_file1.ts
////declare function fn(x: string);

// @Filename: signatureHelpInFunctionCallOnFunctionDeclarationInMultipleFiles_file2.ts
////fn(/*1*/

verify.signatureHelp({ marker: "1", overloadsCount: 2 });
