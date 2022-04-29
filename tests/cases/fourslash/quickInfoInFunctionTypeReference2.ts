/// <reference path='fourslash.ts'/>

////class C<T> {
////    map(fn: (/*1*/k: string, /*2*/value: T, context: any) => void, context: any) {
////    }
////}

////var c: C<number>;
////c.map(/*3*/

verify.quickInfos({
    1: "(parameter) k: string",
    2: "(parameter) value: T"
});

verify.signatureHelp({ marker: "3", text: "map(fn: (k: string, value: number, context: any) => void, context: any): void" });
