/// <reference path='fourslash.ts' />

////class Con/*1*/tainer<T> {
////    x: T;
////}
////interface IList</*2*/T> {
////    getItem(i: number): /*3*/T;
////}
////class List</*4*/T extends IList<number>> implements IList<T> {
////    private __it/*6*/em: /*5*/T[];
////    public get/*7*/Item(i: number) {
////        return this.__item[i];
////    }
////    public /*8*/method</*9*/S extends IList<T>>(s: S, p: /*10*/T[]) {
////        return s;
////    }
////}
////function foo4</*11*/T extends Date>(test: T): T;
////function foo4</*12*/S extends string>(test: S): S;
////function foo4(test: any): any;
////function foo4</*13*/T extends Date>(test: any): any { return null; }

goTo.marker("1");
verify.quickInfoIs("class Container<T>", undefined);
goTo.marker("2");
verify.quickInfoIs("(type parameter) T in IList<T>", undefined);
goTo.marker("3");
verify.quickInfoIs("(type parameter) T in IList<T>", undefined);
goTo.marker("4");
verify.quickInfoIs("(type parameter) T in List<T extends IList<number>>", undefined);
goTo.marker("5");
verify.quickInfoIs("(type parameter) T in List<T extends IList<number>>", undefined);
goTo.marker("6");
verify.quickInfoIs("(property) List<T extends IList<number>>.__item: T[]", undefined);
goTo.marker("7");
verify.quickInfoIs("(method) List<T extends IList<number>>.getItem(i: number): T", undefined);
goTo.marker("8");
verify.quickInfoIs("(method) List<T extends IList<number>>.method<S extends IList<T>>(s: S, p: T[]): S", undefined);
goTo.marker("9");
verify.quickInfoIs("(type parameter) S in List<T extends IList<number>>.method<S extends IList<T>>(s: S, p: T[]): S", undefined);
goTo.marker("10");
verify.quickInfoIs("(type parameter) T in List<T extends IList<number>>", undefined);
goTo.marker("11");
verify.quickInfoIs("(type parameter) T in foo4<T extends Date>(test: T): T", undefined);
goTo.marker("12");
verify.quickInfoIs("(type parameter) S in foo4<S extends string>(test: S): S", undefined);
goTo.marker("13");
verify.quickInfoIs("(type parameter) T in foo4<T extends Date>(test: any): any", undefined);