/// <reference path="fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsFileJsdocTypedefTagTypeExpressionCompletion2_typedef.js

//// class Foo {
////     constructor(value: number) { this.property1 = "hello"; }
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
////  * @type { /*type*/Foo }
////  */
////var x;
/////*globalValue*/
////x./*valueMember*/

interface VerifyCompletionsInJsDoc {
    verifyValueOrType(symbol: string, kind: string): void;
    verifyValue(symbol: string, kind: string): void;
    verifyValueMember(symbol: string, kind: string): void;
}

function verifyCompletionsInJsDocType(marker: string, { verifyValueOrType, verifyValue, verifyValueMember }: VerifyCompletionsInJsDoc) {
    goTo.marker(marker);

    verifyValueOrType("Foo", "class");

    verifyValue("x", "var");

    verifyValueMember("property1", "property");
    verifyValueMember("method3", "method");
    verifyValueMember("method4", "method");
    verifyValueMember("foo", "warning");
}

function verifySymbolPresentWithKind(symbol: string, kind: string) {
    return verify.completionListContains(symbol, /*text*/ undefined, /*documentation*/ undefined, kind);
}

function verifySymbolPresentWithWarning(symbol: string) {
    return verifySymbolPresentWithKind(symbol, "warning");
}

verifyCompletionsInJsDocType("type", {
    verifyValueOrType: verifySymbolPresentWithKind,
    verifyValue: verifySymbolPresentWithWarning,
    verifyValueMember: verifySymbolPresentWithWarning,
});
verifyCompletionsInJsDocType("globalValue", {
    verifyValueOrType: verifySymbolPresentWithKind,
    verifyValue: verifySymbolPresentWithKind,
    verifyValueMember: verifySymbolPresentWithWarning,
});
verifyCompletionsInJsDocType("valueMember", {
    verifyValueOrType: verifySymbolPresentWithWarning,
    verifyValue: verifySymbolPresentWithWarning,
    verifyValueMember: verifySymbolPresentWithKind,
});
