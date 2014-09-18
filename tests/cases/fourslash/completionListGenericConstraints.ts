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
////        value./*publicOnlyMemebers*/
////    }
////}

goTo.marker("objectMembers");
verify.memberListContains("hasOwnProperty");
verify.memberListContains("isPrototypeOf");
verify.memberListContains("toString");

goTo.marker("interfaceMembers");
verify.memberListContains("bar11");
verify.memberListContains("bar12");
verify.memberListContains("bar21");
verify.memberListContains("bar22");

goTo.marker("callableMembers");
verify.memberListContains("name");
verify.memberListContains("apply");
verify.memberListContains("call");
verify.memberListContains("bind");

goTo.marker("publicOnlyMemebers");
verify.memberListContains("publicProperty");
verify.memberListContains("publicMethod");
verify.not.memberListContains("privateProperty");
verify.not.memberListContains("privateMethod");
verify.not.memberListContains("publicStaticMethod");
verify.not.memberListContains("privateStaticMethod");