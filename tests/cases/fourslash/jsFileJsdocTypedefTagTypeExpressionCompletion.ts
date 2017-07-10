/// <reference path="fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsFileJsdocTypedefTagTypeExpressionCompletion_typedef.js

//// /**
////  * @typedef {/*1*/string | /*2*/number} T.NumberLike
////  * @typedef {{/*propertyName*/age: /*3*/number}} T.People
////  * @typedef {string | number} T.O.Q.NumberLike
////  * @type {/*4*/T./*1TypeMember*/NumberLike}
////  */
//// var x;
//// /** @type {/*5*/T./*2TypeMember*/O.Q.NumberLike} */
//// var x1; 
//// /** @type {/*6*/T./*3TypeMember*/People} */
//// var x1;
//// /*globalValue*/

interface VerifyCompletionsInJsDoc {
    verifyType(symbol: string, kind: string): void;
    verifyValue(symbol: string, kind: string): void;
    verifyTypeMember(symbol: string, kind: string): void;
}

function verifyCompletionsInJsDocType(marker: string, { verifyType, verifyValue, verifyTypeMember }: VerifyCompletionsInJsDoc) {
    goTo.marker(marker);

    verifyType("T", "module");

    // TODO: May be filter keywords based on context
    //verifyType("string", "keyword");
    //verifyType("number", "keyword");

    verifyValue("x", "var");
    verifyValue("x1", "var");

    verifyTypeMember("NumberLike", "type");
    verifyTypeMember("People", "type");
    verifyTypeMember("O", "module");
}

function verifySymbolPresentWithKind(symbol: string, kind: string) {
    return verify.completionListContains(symbol, /*text*/ undefined, /*documentation*/ undefined, kind);
}

function verifySymbolPresentWithWarning(symbol: string) {
    return verifySymbolPresentWithKind(symbol, "warning");
}

for (let i = 1; i <= 6; i++) {
    verifyCompletionsInJsDocType(i.toString(), {
        verifyType: verifySymbolPresentWithKind,
        verifyValue: verifySymbolPresentWithWarning,
        verifyTypeMember: verifySymbolPresentWithWarning,
    });
}
verifyCompletionsInJsDocType("globalValue", {
    verifyType: verifySymbolPresentWithWarning,
    verifyValue: verifySymbolPresentWithKind,
    verifyTypeMember: verifySymbolPresentWithWarning,
});
for (let i = 1; i <= 3; i++) {
    verifyCompletionsInJsDocType(i.toString() + "TypeMember", {
        verifyType: verifySymbolPresentWithWarning,
        verifyValue: verifySymbolPresentWithWarning,
        verifyTypeMember: verifySymbolPresentWithKind,
    });
}
goTo.marker("propertyName");
verify.completionListIsEmpty();
