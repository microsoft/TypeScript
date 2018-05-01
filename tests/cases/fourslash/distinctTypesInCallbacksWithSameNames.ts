/// <reference path='fourslash.ts'/>

////interface Collection<T> {
////    length: number;
////    add(x: T): void;
////    remove(x: T): boolean;
////}
////interface Combinators {
////    forEach<T>(c: Collection<T>, f: (x: T) => any): void;
////    forEach<T, U>(c: Collection<T>, f: (x: T) => U): void;
////}
////var c2: Collection<number>;
////var c3: Collection<Collection<number>>;
////var _: Combinators;
////var r = _.forEach(c2, (x) => { return x./*1*/toFixed() });
////var r2 = _.forEach(c3, (x) => { return x./*2*/toFixed() });
/////*3*/

const verifyCompletions = () =>
    verify.completions(
        { at: "1", includes: "toFixed" },
        { at: "2", are: ["length", "add", "remove"] },
    );

verifyCompletions();

goTo.marker('3');
edit.insert(`class A {
    foo() { }
}
var c4: Collection<A>;
var r3 = _.forEach(c4, (x) => { return x.foo() });
`);

verifyCompletions();
