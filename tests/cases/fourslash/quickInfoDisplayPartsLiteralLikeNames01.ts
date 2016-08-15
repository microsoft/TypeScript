/// <reference path='fourslash.ts'/>

////class C {
////    public /*1*/1() { }
////    private /*2*/Infinity() { }
////    protected /*3*/NaN() { }
////    static /*4*/"stringLiteralName"() { }
////    method() {
////        this[/*5*/1]();
////        this[/*6*/"1"]();
////        this./*7*/Infinity();
////        this[/*8*/"Infinity"]();
////        this./*9*/NaN();
////        C./*10*/stringLiteralName();
////    }

verifyClassMethodWithElementAccessDisplay("1", "public", "1", "methodName", /*spanLength*/ "1".length);
verifyClassMethodWithPropertyAccessDisplay("2", "private", "Infinity", /*spanLength*/ "Infinity".length);
verifyClassMethodWithPropertyAccessDisplay("3", "protected", "NaN", /*spanLength*/ "NaN".length);
verifyClassMethodWithElementAccessDisplay("4", "static", '"stringLiteralName"', "stringLiteral", /*spanLength*/ '"stringLiteralName"'.length);
verifyClassMethodWithElementAccessDisplay("5", "public", "1", "methodName", /*spanLength*/ "1".length);
verifyClassMethodWithElementAccessDisplay("6", "public", "1", "methodName", /*spanLength*/ "1".length + 2);
verifyClassMethodWithPropertyAccessDisplay("7", "private", "Infinity", /*spanLength*/ "Infinity".length);
verifyClassMethodWithPropertyAccessDisplay("8", "private", "Infinity", /*spanLength*/ "Infinity".length + 2);
verifyClassMethodWithPropertyAccessDisplay("9", "protected", "NaN", /*spanLength*/ "NaN".length);
verifyClassMethodWithElementAccessDisplay("10", "static", '"stringLiteralName"', "stringLiteral", /*spanLength*/ "stringLiteralName".length);


function verifyClassMethodWithPropertyAccessDisplay(markerName: string, kindModifiers: string, methodName: string, spanLength: number) {
    goTo.marker(markerName);
    verify.verifyQuickInfoDisplayParts("method", kindModifiers, { start: test.markerByName(markerName).position, length: spanLength },
        [{ text: "(", kind: "punctuation" }, { text: "method", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" },
            { text: "C", kind: "className" }, { text: ".", kind: "punctuation" }, { text: methodName, kind: "methodName" },
            { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "void", kind: "keyword" }],
        []);
}

function verifyClassMethodWithElementAccessDisplay(markerName: string, kindModifiers: string, methodName: string, methodDisplay: "methodName" | "stringLiteral", spanLength: number) {
    goTo.marker(markerName);
    verify.verifyQuickInfoDisplayParts("method", kindModifiers, { start: test.markerByName(markerName).position, length: spanLength },
        [{ text: "(", kind: "punctuation" }, { text: "method", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" },
            { text: "C", kind: "className" }, { text: "[", kind: "punctuation" }, { text: methodName, kind: methodDisplay }, { text: "]", kind: "punctuation" },
            { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "void", kind: "keyword" }],
        []);
}
