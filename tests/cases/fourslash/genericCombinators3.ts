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

goTo.marker('1a');
verify.quickInfoIs('(parameter) x: number');

goTo.marker('1b');
verify.quickInfoIs('(parameter) y: string');

goTo.marker('1c');
verify.quickInfoIs('(method) Combinators.map<number, string, string>(c: Collection<number, string>, f: (x: number, y: string) => string): Collection<number, string> (+ 1 overload(s))');

goTo.marker('9');
verify.quickInfoIs('(var) r1a: Collection<number, string>');
