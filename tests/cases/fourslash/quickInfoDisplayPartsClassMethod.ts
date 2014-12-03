/// <reference path='fourslash.ts'/>

////class c {
////    public /*1*/publicMethod() { }
////    private /*2*/privateMethod() { }
////    protected /*21*/protectedMethod() { }
////    static /*3*/staticMethod() { }
////    private static /*4*/privateStaticMethod() { }
////    protected static /*41*/protectedStaticMethod() { }
////    method() {
////        this./*5*/publicMethod();
////        this./*6*/privateMethod();
////        this./*61*/protectedMethod();
////        c./*7*/staticMethod();
////        c./*8*/privateStaticMethod();
////        c./*81*/protectedStaticMethod();
////    }
////}
////var cInstance = new c();
/////*9*/cInstance./*10*/publicMethod();
/////*11*/c./*12*/staticMethod();

function verifyClassMethod(markerName: string, kindModifiers: string, methodName: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfoDisplayParts("method", kindModifiers, { start: test.markerByName(markerName).position, length: methodName.length },
        [{ text: "(", kind: "punctuation" }, { text: "method", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" },
            { text: "c", kind: "className" }, { text: ".", kind: "punctuation" }, { text: methodName, kind: "methodName" },
            { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "void", kind: "keyword" }],
        []);
}

function verifyPublicMethod(markerName: string) {
    verifyClassMethod(markerName, "public", "publicMethod");
}

function verifyPrivateMethod(markerName: string) {
    verifyClassMethod(markerName, "private", "privateMethod");
}

function verifyProtectedMethod(markerName: string) {
    verifyClassMethod(markerName, "protected", "protectedMethod");
}

function verifyStaticMethod(markerName: string) {
    verifyClassMethod(markerName, "static", "staticMethod");
}

function verifyPrivateStaticMethod(markerName: string) {
    verifyClassMethod(markerName, "private,static", "privateStaticMethod");
}

function verifyProtectedStaticMethod(markerName: string) {
    verifyClassMethod(markerName, "protected,static", "protectedStaticMethod");
}

verifyPublicMethod('1');
verifyPrivateMethod('2');
verifyProtectedMethod('21');
verifyStaticMethod('3');
verifyPrivateStaticMethod('4');
verifyProtectedStaticMethod('41');

verifyPublicMethod('5');
verifyPrivateMethod('6');
verifyProtectedMethod('61');
verifyStaticMethod('7');
verifyPrivateStaticMethod('8');
verifyProtectedStaticMethod('81');

goTo.marker('9');
verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName("9").position, length: "cInstance".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "cInstance", kind: "localName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

verifyPublicMethod('10');

goTo.marker('11');
verify.verifyQuickInfoDisplayParts("class", "", { start: test.markerByName("11").position, length: "c".length },
    [{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

verifyStaticMethod('12');