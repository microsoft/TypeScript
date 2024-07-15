/// <reference path='fourslash.ts' />

// @strict: true

//// type GetConcreteByKey<T, TKey extends keyof T, TValue extends T[TKey]> = T &
////   Record<TKey, TValue>;
//// type V1 = GetConcreteByKey<{ type: "foo" } | { type: "bar" }, "/*1*/", "foo">;
//// type V2 = GetConcreteByKey<{ type: "foo" } | { type: "bar" }, "/*2*/">;
////
//// declare class Cls<T, TKey extends keyof T, TValue extends T[TKey]> {
////   _T: T;
////   _TKey: TKey;
////   _TValue: TValue;
//// }
//// const instance1 = new Cls<{ type: "foo" } | { type: "bar" }, "/*3*/", "foo">();
//// const instance2 = new Cls<{ type: "foo" } | { type: "bar" }, "/*4*/">();
//// const instance3 = new Cls<{ type: "foo" } | { type: "bar" }, "/*5*/", "foo">;
//// const instance4 = new Cls<{ type: "foo" } | { type: "bar" }, "/*6*/">;
//// const instance5 = Cls<{ type: "foo" } | { type: "bar" }, "/*7*/", "foo">;
//// const instance6 = Cls<{ type: "foo" } | { type: "bar" }, "/*8*/">;
////
//// type C1 = Cls<{ type: "foo" } | { type: "bar" }, "/*9*/", "foo">;
//// type C2 = Cls<{ type: "foo" } | { type: "bar" }, "/*10*/">;
////
//// interface MyInterface<T, TKey extends keyof T, TValue extends T[TKey]> {
////   _T: T;
////   _TKey: TKey;
////   _TValue: TValue;
//// }
////
//// type T1 = MyInterface<{ type: "foo" } | { type: "bar" }, "/*11*/", "foo">;
//// type T2 = MyInterface<{ type: "foo" } | { type: "bar" }, "/*12*/">;

verify.completions({
    marker: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    exact: ["type"]
});
