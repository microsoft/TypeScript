/// <reference path='fourslash.ts' />

////declare function foo1<T>(obj: T, settings: (row: T) => { value: string, func?: Function }): void;
////
////foo1(new Error(),
////    o/*1*/ => ({
////        value: o.name,
////        func: x => 'foo'
////    })
////);
////
////declare function foo2<T>(settings: (row: T) => { value: string, func?: Function }, obj: T): void;
////
////foo2(o/*2*/ => ({
////        value: o.name,
////        func: x => 'foo'
////    }),
////    new Error(),
////);
////
////declare function foof<T extends { name: string }, U extends keyof T>(settings: (row: T) => { value: T[U], func?: Function }, obj: T, key: U): U;
////
////function q<T extends { name: string }>(x: T): T["name"] {
////    return foof/*3*/(o => ({ value: o.name, func: x => 'foo' }), x, "name");
////}
////
////foof/*4*/(o => ({ value: o.name, func: x => 'foo' }), new Error(), "name");

verify.quickInfos({
    1: "(parameter) o: Error",
    2: "(parameter) o: Error",
    3: `function foof<T, "name">(settings: (row: T) => {
    value: T["name"];
    func?: Function;
}, obj: T, key: "name"): "name"`,
    4: `function foof<Error, "name">(settings: (row: Error) => {
    value: string;
    func?: Function;
}, obj: Error, key: "name"): "name"`
});
