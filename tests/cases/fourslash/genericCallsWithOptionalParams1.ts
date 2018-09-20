/// <reference path='fourslash.ts'/>

////class Collection<T> {
////    public add(x: T) { }

////}
////interface Utils {
////    fold<T, S>(c: Collection<T>, folder: (s: S, t: T) => T, init?: S): T;
////}
////var c = new Collection<string>();
////var utils: Utils;
////var /*1*/r = utils.fold(c, (s, t) => t, "");
////var /*2*/r2 = utils.fold(c, (s, t) => t);

verify.quickInfos({
    1: "var r: string",
    2: "var r2: string"
});
