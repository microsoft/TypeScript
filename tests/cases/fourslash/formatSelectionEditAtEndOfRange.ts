/// <reference path="fourslash.ts" />


//// /*1*/interface Base {
////     c(a: string): string
////     c(a: number): number;/*2*/
//// }

format.setFormatOptions({ semicolons: ts.SemicolonPreference.Remove });
format.selection("1", "2");
verify.currentFileContentIs(
`interface Base {
    c(a: string): string
    c(a: number): number
}`
);
