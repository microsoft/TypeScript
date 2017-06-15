/// <reference path="fourslash.ts"/>

////interface I {
////    age: number;
////}
//// class Foo {
////     property1: string;
////     constructor(value: number) { this.property1 = "hello"; }
////     static method1() {}
////     method3(): number { return 3; }
////     /**
////      * @param {string} foo A value.
////      * @returns {number} Another value
////      * @mytag 
////      */
////     method4(foo: string) { return 3; }
//// }
//// namespace Foo.Namespace { export interface SomeType { age2: number } }
//// /**
////  * @type { /*type1*/Foo./*typeFooMember*/Namespace./*NamespaceMember*/SomeType }
////  */
////var x;
/////*globalValue*/
////x./*valueMemberOfSomeType*/
////var x1: Foo;
////x1./*valueMemberOfFooInstance*/;
////Foo./*valueMemberOfFoo*/;
//// /**
////  * @type { {/*propertyName*/ageX: number} }
////  */
////var y;

function verifySymbolPresentWithKind(symbol: string, kind: string) {
    return verify.completionListContains(symbol, /*text*/ undefined, /*documentation*/ undefined, kind);
}

function verifySymbolNotPresent(symbol: string) {
    return verify.not.completionListContains(symbol);
}

goTo.marker("type1");
verifySymbolPresentWithKind("Foo", "class");
verifySymbolPresentWithKind("I", "interface");
verifySymbolNotPresent("Namespace");
verifySymbolNotPresent("SomeType");
verifySymbolNotPresent("x");
verifySymbolNotPresent("x1");
verifySymbolNotPresent("y");
verifySymbolNotPresent("method1");
verifySymbolNotPresent("property1");
verifySymbolNotPresent("method3");
verifySymbolNotPresent("method4");
verifySymbolNotPresent("foo");

goTo.marker("typeFooMember");
verifySymbolNotPresent("Foo");
verifySymbolNotPresent("I");
verifySymbolPresentWithKind("Namespace", "module");
verifySymbolNotPresent("SomeType");
verifySymbolNotPresent("x");
verifySymbolNotPresent("x1");
verifySymbolNotPresent("y");
verifySymbolNotPresent("method1");
verifySymbolNotPresent("property1");
verifySymbolNotPresent("method3");
verifySymbolNotPresent("method4");
verifySymbolNotPresent("foo");

goTo.marker("NamespaceMember");
verifySymbolNotPresent("Foo");
verifySymbolNotPresent("I");
verifySymbolNotPresent("Namespace");
verifySymbolPresentWithKind("SomeType", "interface");
verifySymbolNotPresent("x");
verifySymbolNotPresent("x1");
verifySymbolNotPresent("y");
verifySymbolNotPresent("method1");
verifySymbolNotPresent("property1");
verifySymbolNotPresent("method3");
verifySymbolNotPresent("method4");
verifySymbolNotPresent("foo");

goTo.marker("globalValue");
verifySymbolPresentWithKind("Foo", "class");
verifySymbolNotPresent("I");
verifySymbolNotPresent("Namespace");
verifySymbolNotPresent("SomeType");
verifySymbolPresentWithKind("x", "var");
verifySymbolPresentWithKind("x1", "var");
verifySymbolPresentWithKind("y", "var");
verifySymbolNotPresent("method1");
verifySymbolNotPresent("property1");
verifySymbolNotPresent("method3");
verifySymbolNotPresent("method4");
verifySymbolNotPresent("foo");

goTo.marker("valueMemberOfSomeType");
verifySymbolNotPresent("Foo");
verifySymbolNotPresent("I");
verifySymbolNotPresent("Namespace");
verifySymbolNotPresent("SomeType");
verifySymbolNotPresent("x");
verifySymbolNotPresent("x1");
verifySymbolNotPresent("y");
verifySymbolNotPresent("method1");
verifySymbolNotPresent("property1");
verifySymbolNotPresent("method3");
verifySymbolNotPresent("method4");
verifySymbolNotPresent("foo");

goTo.marker("valueMemberOfFooInstance");
verifySymbolNotPresent("Foo");
verifySymbolNotPresent("I");
verifySymbolNotPresent("Namespace");
verifySymbolNotPresent("SomeType");
verifySymbolNotPresent("x");
verifySymbolNotPresent("x1");
verifySymbolNotPresent("y");
verifySymbolNotPresent("method1");
verifySymbolPresentWithKind("property1", "property");
verifySymbolPresentWithKind("method3", "method");
verifySymbolPresentWithKind("method4", "method");
verifySymbolNotPresent("foo");

goTo.marker("valueMemberOfFoo");
verifySymbolNotPresent("Foo");
verifySymbolNotPresent("I");
verifySymbolNotPresent("Namespace");
verifySymbolNotPresent("SomeType");
verifySymbolNotPresent("x");
verifySymbolNotPresent("x1");
verifySymbolNotPresent("y");
verifySymbolPresentWithKind("method1", "method");
verifySymbolNotPresent("property1");
verifySymbolNotPresent("method3");
verifySymbolNotPresent("method4");
verifySymbolNotPresent("foo");

goTo.marker("propertyName");
verify.completionListIsEmpty();