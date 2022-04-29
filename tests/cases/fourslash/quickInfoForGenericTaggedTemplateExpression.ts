/// <reference path='fourslash.ts'/>

////interface T1 {}
////class T2 {}
////type T3 = "a" | "b";
////
////declare function foo<T>(strings: TemplateStringsArray, ...values: T[]): void;
////
/////*1*/foo<number>``;
/////*2*/foo<string | number>``;
/////*3*/foo<{ a: number }>``;
/////*4*/foo<T1>``;
/////*5*/foo<T2>``;
/////*6*/foo<T3>``;
/////*7*/foo``;

verify.quickInfoAt("1", "function foo<number>(strings: TemplateStringsArray, ...values: number[]): void");
verify.quickInfoAt("2", "function foo<string | number>(strings: TemplateStringsArray, ...values: (string | number)[]): void");
verify.quickInfoAt("3",
`function foo<{
    a: number;
}>(strings: TemplateStringsArray, ...values: {
    a: number;
}[]): void`);
verify.quickInfoAt("4", "function foo<T1>(strings: TemplateStringsArray, ...values: T1[]): void");
verify.quickInfoAt("5", "function foo<T2>(strings: TemplateStringsArray, ...values: T2[]): void");
verify.quickInfoAt("6", "function foo<T3>(strings: TemplateStringsArray, ...values: T3[]): void");
verify.quickInfoAt("7", "function foo<unknown>(strings: TemplateStringsArray, ...values: unknown[]): void");
