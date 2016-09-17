/// <reference path='fourslash.ts'/>

////interface Collection<T, U> {
////}
////
////interface Combinators {
////    map<T, U, V>(c: Collection<T,U>, f: (x: T, y: U) => V): Collection<T, V>;
////    map<T, U>(c: Collection<T,U>, f: (x: T, y: U) => any): Collection<any, any>;
////}
////
////var c2: Collection<number, string>;
////
////var _: Combinators;
////
////var /*9*/r1a  = _.ma/*1c*/p(c2, (/*1a*/x,/*1b*/y) => { return x + "" });  // check quick info of map here

verify.quickInfos({
    "1a": "(parameter) x: number",
    "1b": "(parameter) y: string",
    "1c": "(method) Combinators.map<number, string, string>(c: Collection<number, string>, f: (x: number, y: string) => string): Collection<number, string> (+1 overload)",
    9: "var r1a: Collection<number, string>"
});
