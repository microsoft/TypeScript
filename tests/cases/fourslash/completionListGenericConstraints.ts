/// <reference path="fourslash.ts" />

////// Simple constraint
////class Foo<T extends Object> {
////    private v: T;
////    public value(): void {
////        this.v./*objectMembers*/
////    }
////}
////// Inheritance in constraints
////interface IBar1 {
////    bar11: number;
////    bar12: string;
////}
////
////interface IBar2  extends IBar1 {
////    bar21: boolean;
////    bar22: IBar2;
////}
////
////class BarWrapper<T extends IBar2> {
////    private value: T;
////    public getValue(){
////        this.value./*interfaceMembers*/;
////    }
////}
////// Interface with call signature
////interface ICallable {
////    (n: number): string;
////    name: string;
////}
////
////class CallableWrapper<T extends ICallable> {
////    public call(value: T) {
////        value./*callableMembers*/
////    }
////}
////// Only public members of a constraint should be shown
////class Base {
////    public publicProperty: number;
////    private privateProperty: number;
////    public publicMethod(): void { }
////    private privateMethod(): void { }
////    public static publicStaticMethod(): void { }
////    private static privateStaticMethod(): void { }
////}
////
////class BaseWrapper<T extends Base> {
////    public test(value: T) {
////        value./*publicOnlyMembers*/
////    }
////}

verify.completions(
    { marker: "objectMembers", unsorted: ["constructor", "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable"] },
    { marker: "interfaceMembers", unsorted: ["bar21", "bar22", "bar11", "bar12"] },
    { marker: "callableMembers", unsorted: ["name", ...completion.functionMembersWithPrototype] },
    { marker: "publicOnlyMembers", unsorted: ["publicProperty", "publicMethod"] },
);
