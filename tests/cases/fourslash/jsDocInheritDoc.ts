///<reference path="fourslash.ts" />
// @Filename: inheritDoc.ts
////class Foo {
////    /**
////     * Foo constructor documentation
////     */
////    constructor(value: number) {}
////    /**
////     * Foo#method1 documentation
////     */
////    static method1() {}
////    /**
////     * Foo#method2 documentation
////     */
////    method2() {}
////    /**
////     * Foo#property1 documentation
////     */
////    property1: string;
////}
////interface Baz {
////    /** Baz#property1 documentation */
////    property1: string;
////    /** Baz#property2 documentation */
////    property2: object;
////}
////class Bar extends Foo implements Baz {
////    ctorValue: number;
////    /** @inheritDoc */
////    constructor(value: number) {
////        super(value);
////        this.ctorValue = value;
////    }
////    /** @inheritDoc */
////    static method1() {}
////    /** @inheritDoc */
////    method2() {}
////    /** @inheritDoc */
////    property1: string;
////    /** @inheritDoc */
////    property2: object;
////}
////const b = new Bar/*1*/(5);
////b.method2/*2*/();
////Bar.method1/*3*/();
////const p1 = b.property1/*4*/;
////const p2 = b.property2/*5*/;

verify.baselineQuickInfo();
