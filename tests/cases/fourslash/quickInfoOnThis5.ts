/// <reference path='fourslash.ts' />

verify.quickInfos({
    1: "this: ContextualInterface",
    2: "(parameter) this: void"
});



////interface ContextualInterface {
////    m: number;
////    method(this: this, n: number);
////}
////let o: ContextualInterface = {
////    m: 12,
////    method(n) {
////        let x = this/*1*/.m;
////    }
////}
////interface ContextualInterface2 {
////    (this: void, n: number): void;
////}
////let contextualInterface2: ContextualInterface2 = function (th/*2*/is, n) { }

class A {
    x: number
    myMethod(): this { return this; }
}

class B extends A {
    constructor(){
        super();
        this.myMethod();
    }
}
