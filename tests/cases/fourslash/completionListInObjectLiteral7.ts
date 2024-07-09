/// <reference path='fourslash.ts'/>

////type Foo = { foo: boolean };
////function f<T>(shape: Foo): any;
////function f<T>(shape: () => Foo): any;
////function f(arg: any) {
////  return arg;
////}
////
////f({ /*1*/ });
////f(() => ({ /*2*/ }));
////f(() => (({ /*3*/ })));

verify.completions({
    marker: ["1", "2", "3"],
    exact: ["foo"]
});
