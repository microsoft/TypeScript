/// <reference path='fourslash.ts' />

////class Con/*1*/tainer<T> {
////    x: T;
////}
////interface IList</*2*/T> {
////    getItem(i: number): /*3*/T;
////}
////class List</*4*/T extends IList<T>> implements IList<T> {
////    private __it/*6*/em: /*5*/T[];
////    public get/*7*/Item(i: number) {
////        return this.__item[i];
////    }
////}

goTo.marker("1");
verify.quickInfoIs(undefined, undefined, "Container<T>", "class");
goTo.marker("2");
verify.quickInfoIs(undefined, undefined, "T in IList<T>", "type parameter");
goTo.marker("3");
verify.quickInfoIs(undefined, undefined, "T in IList<T>", "type parameter");
goTo.marker("4");
verify.quickInfoIs(undefined, undefined, "T in List<T extends IList<T>>", "type parameter");
goTo.marker("5");
verify.quickInfoIs(undefined, undefined, "T in List<T extends IList<T>>", "type parameter");
goTo.marker("6");
verify.quickInfoIs(undefined, undefined, "List<T extends IList<T>>.__item", "property");
goTo.marker("7");
verify.quickInfoIs(undefined, undefined, "List<T extends IList<T>>.getItem", "method");


