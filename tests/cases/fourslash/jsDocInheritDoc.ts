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
////    /**
////     * Foo#property3 documentation
////     */
////    property3 = "instance prop";
////}
////interface Baz {
////    /** Baz#property1 documentation */
////    property1: string;
////    /**
////     * Baz#property2 documentation
////     */
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
////    method2() {}
////    /** @inheritDoc */
////    property1: string;
////    /**
////     * Bar#property2
////     * @inheritDoc
////     */
////    property2: object;
////
////    static /*6*/property3 = "class prop";
////}
////const b = new Bar/*1*/(5);
////b.method2/*2*/();
////Bar.method1/*3*/();
////const p1 = b.property1/*4*/;
////const p2 = b.property2/*5*/;

verify.quickInfoAt("1", "constructor Bar(value: number): Bar", undefined); // constructors aren't actually inherited
verify.quickInfoAt("2", "(method) Bar.method2(): void", "Foo#method2 documentation"); // use inherited docs only
verify.quickInfoAt("3", "(method) Bar.method1(): void", 'Foo#method1 documentation'); // use inherited docs too
verify.quickInfoAt("4", "(property) Bar.property1: string", "Foo#property1 documentation"); // use inherited docs only
verify.quickInfoAt("5", "(property) Bar.property2: object", "Baz#property2 documentation\nBar#property2"); // include local and inherited docs
verify.quickInfoAt("6", "(property) Bar.property3: string", undefined);
