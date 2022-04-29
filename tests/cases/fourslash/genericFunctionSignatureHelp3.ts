/// <reference path='fourslash.ts'/>

////function foo1<T>(x: number, callback: (y1: T) => number) { }
////function foo2<T>(x: number, callback: (y2: T) => number) { }
////function foo3<T>(x: number, callback: (y3: T) => number) { }
////function foo4<T>(x: number, callback: (y4: T) => number) { }
////function foo5<T>(x: number, callback: (y5: T) => number) { }
////function foo6<T>(x: number, callback: (y6: T) => number) { }
////function foo7<T>(x: number, callback: (y7: T) => number) { }
//// IDE shows the results on the right of each line, fourslash says different
////foo1(/*1*/               // signature help shows y as T
////foo2(1,/*2*/             // signature help shows y as {}
////foo3(1, (/*3*/           // signature help shows y as T
////foo4<string>(1,/*4*/     // signature help shows y as string
////foo5<string>(1, (/*5*/   // signature help shows y as T
////foo6(1, </*6*/           // signature help shows y as {}
////foo7(1, <string>(/*7*/   // signature help shows y as T

verify.signatureHelp(
    { marker: "1", text: "foo1(x: number, callback: (y1: unknown) => number): void" },
    { marker: "2", text: "foo2(x: number, callback: (y2: unknown) => number): void" },
    { marker: "3", text: "callback(y3: unknown): number" },
    { marker: "4", text: "foo4(x: number, callback: (y4: string) => number): void" },
    { marker: "5", text: "callback(y5: string): number" },
);

goTo.marker('6');
verify.signatureHelp({ text: "foo6(x: number, callback: (y6: unknown) => number): void" });
edit.insert('string>(null,null);'); // need to make this line parse so we can get reasonable LS answers to later tests

verify.signatureHelp({ marker: "7", text: "foo7(x: number, callback: (y7: unknown) => number): void" });
