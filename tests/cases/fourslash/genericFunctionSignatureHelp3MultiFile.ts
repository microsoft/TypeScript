/// <reference path='fourslash.ts'/>

// @Filename: genericFunctionSignatureHelp_0.ts
////function foo1<T>(x: number, callback: (y1: T) => number) { }
// @Filename: genericFunctionSignatureHelp_1.ts
////function foo2<T>(x: number, callback: (y2: T) => number) { }
// @Filename: genericFunctionSignatureHelp_2.ts
////function foo3<T>(x: number, callback: (y3: T) => number) { }
// @Filename: genericFunctionSignatureHelp_3.ts
////function foo4<T>(x: number, callback: (y4: T) => number) { }
// @Filename: genericFunctionSignatureHelp_4.ts
////function foo5<T>(x: number, callback: (y5: T) => number) { }
// @Filename: genericFunctionSignatureHelp_5.ts
////function foo6<T>(x: number, callback: (y6: T) => number) { }
// @Filename: genericFunctionSignatureHelp_6.ts
////function foo7<T>(x: number, callback: (y7: T) => number) { }
// @Filename: genericFunctionSignatureHelp_7.ts
////foo1(/*1*/               // signature help shows y as T
////foo2(1,/*2*/             // signature help shows y as {}
////foo3(1, (/*3*/           // signature help shows y as T
////foo4<string>(1,/*4*/     // signature help shows y as string
////foo5<string>(1, (/*5*/   // signature help shows y as T
////foo6(1, </*6*/           // signature help shows y as {}
////foo7(1, <string>(/*7*/   // signature help shows y as T

verify.signatureHelp(
    { marker: "1", text: "foo1<T>(x: number, callback: (y1: T) => number): void" },
    { marker: "2", text: "foo2<T>(x: number, callback: (y2: T) => number): void" },
    { marker: "3", text: "foo3<T>(x: number, callback: (y3: T) => number): void" },
    { marker: "4", text: "foo4(x: number, callback: (y4: string) => number): void" },
    { marker: "5", text: "foo5(x: number, callback: (y5: string) => number): void" },
);

goTo.marker('6');
verify.signatureHelp({ text: "foo6(x: number, callback: (y6: {}) => number): void" });
edit.insert('string>(null,null);'); // need to make this line parse so we can get reasonable LS answers to later tests

verify.signatureHelp({ marker: "7", text: "foo7<T>(x: number, callback: (y7: T) => number): void" })
