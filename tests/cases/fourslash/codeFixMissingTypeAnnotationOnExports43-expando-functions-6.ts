/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
//// export function ImportExcelProgressModal(): number {
////   return 12
//// }
////
///// export declare namespace ImportExcelProgressModal {
////     export var show: () => boolean;
////     export var n: number
//// }
////
//// ImportExcelProgressModal.show = (): boolean => { 	
////   return false;
//// };
//// ImportExcelProgressModal.n = 13

verify.noErrors();
