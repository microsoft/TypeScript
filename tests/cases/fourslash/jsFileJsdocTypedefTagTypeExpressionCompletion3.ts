/// <reference path="fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsFileJsdocTypedefTagTypeExpressionCompletion3_typedef.js

//// /**
////  * @typedef {{ age: number }} Foo.Namespace.SomeType
////  */
//// class Foo {
////     constructor(value) { this.property1 = "hello"; }
////     static method1() {}
////     method3() { return 3; }
////     /**
////      * @param {string} foo A value.
////      * @returns {number} Another value
////      * @mytag 
////      */
////     method4(foo) { return 3; }
//// }
//// /**
////  * @type { /*type1*/Foo./*typeFooMember*/Namespace./*NamespaceMember*/SomeType }
////  */
////var x;
/////*globalValue*/
////x./*valueMemberOfSomeType*/
//// /**
////  * @type { /*type2*/Foo }
////  */
////var x1;
////x1./*valueMemberOfFooInstance*/;
////Foo./*valueMemberOfFoo*/;

function verifySymbolPresentWithKind(symbol: string, kind: string) {
    return verify.completionListContains(symbol, /*text*/ undefined, /*documentation*/ undefined, kind);
}

function verifySymbolPresentWithWarning(symbol: string) {
    return verifySymbolPresentWithKind(symbol, "warning");
}

for (const marker of ["type1", "type2"]) {
    goTo.marker(marker);
    verifySymbolPresentWithKind("Foo", "class");

    verifySymbolPresentWithWarning("Namespace");
    verifySymbolPresentWithWarning("SomeType");

    verifySymbolPresentWithWarning("x");
    verifySymbolPresentWithWarning("x1");
    verifySymbolPresentWithWarning("method1");
    verifySymbolPresentWithWarning("property1");
    verifySymbolPresentWithWarning("method3");
    verifySymbolPresentWithWarning("method4");
    verifySymbolPresentWithWarning("foo");
}

goTo.marker("typeFooMember");
verifySymbolPresentWithWarning("Foo");
verifySymbolPresentWithKind("Namespace", "module");
verifySymbolPresentWithWarning("SomeType");
verifySymbolPresentWithWarning("x");
verifySymbolPresentWithWarning("x1");
verifySymbolPresentWithWarning("method1");
verifySymbolPresentWithWarning("property1");
verifySymbolPresentWithWarning("method3");
verifySymbolPresentWithWarning("method4");
verifySymbolPresentWithWarning("foo");

goTo.marker("NamespaceMember");
verifySymbolPresentWithWarning("Foo");
verifySymbolPresentWithWarning("Namespace");
verifySymbolPresentWithKind("SomeType", "type");
verifySymbolPresentWithWarning("x");
verifySymbolPresentWithWarning("x1");
verifySymbolPresentWithWarning("method1");
verifySymbolPresentWithWarning("property1");
verifySymbolPresentWithWarning("method3");
verifySymbolPresentWithWarning("method4");
verifySymbolPresentWithWarning("foo");

goTo.marker("globalValue");
verifySymbolPresentWithKind("Foo", "class");
verifySymbolPresentWithWarning("Namespace");
verifySymbolPresentWithWarning("SomeType");
verifySymbolPresentWithKind("x", "var");
verifySymbolPresentWithKind("x1", "var");
verifySymbolPresentWithWarning("method1");
verifySymbolPresentWithWarning("property1");
verifySymbolPresentWithWarning("method3");
verifySymbolPresentWithWarning("method4");
verifySymbolPresentWithWarning("foo");

goTo.marker("valueMemberOfSomeType");
verifySymbolPresentWithWarning("Foo");
verifySymbolPresentWithWarning("Namespace");
verifySymbolPresentWithWarning("SomeType");
verifySymbolPresentWithWarning("x");
verifySymbolPresentWithWarning("x1");
verifySymbolPresentWithWarning("method1");
verifySymbolPresentWithWarning("property1");
verifySymbolPresentWithWarning("method3");
verifySymbolPresentWithWarning("method4");
verifySymbolPresentWithWarning("foo");

goTo.marker("valueMemberOfFooInstance");
verifySymbolPresentWithWarning("Foo");
verifySymbolPresentWithWarning("Namespace");
verifySymbolPresentWithWarning("SomeType");
verifySymbolPresentWithWarning("x");
verifySymbolPresentWithWarning("x1");
verifySymbolPresentWithWarning("method1");
verifySymbolPresentWithKind("property1", "property");
verifySymbolPresentWithKind("method3", "method");
verifySymbolPresentWithKind("method4", "method");
verifySymbolPresentWithKind("foo", "warning");

goTo.marker("valueMemberOfFoo");
verifySymbolPresentWithWarning("Foo");
verifySymbolPresentWithWarning("Namespace");
verifySymbolPresentWithWarning("SomeType");
verifySymbolPresentWithWarning("x");
verifySymbolPresentWithWarning("x1");
verifySymbolPresentWithKind("method1", "method");
verifySymbolPresentWithWarning("property1");
verifySymbolPresentWithWarning("method3");
verifySymbolPresentWithWarning("method4");
verifySymbolPresentWithWarning("foo");