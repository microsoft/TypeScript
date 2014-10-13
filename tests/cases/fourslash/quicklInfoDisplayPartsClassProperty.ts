/// <reference path='fourslash.ts'/>

////class c {
////    public /*1*/publicProperty: string;
////    private /*2*/privateProperty: string;
////    protected /*21*/protectedProperty: string;
////    static /*3*/staticProperty: string;
////    private static /*4*/privateStaticProperty: string;
////    protected static /*41*/protectedStaticProperty: string;
////    method() {
////        this./*5*/publicProperty;
////        this./*6*/privateProperty;
////        this./*61*/protectedProperty;
////        c./*7*/staticProperty;
////        c./*8*/privateStaticProperty;
////        c./*81*/protectedStaticProperty;
////    }
////}
////var cInstance = new c();
/////*9*/cInstance./*10*/publicProperty;
/////*11*/c./*12*/staticProperty;

function verifyClassProperty(markerName: string, kindModifiers: string, propertyName: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfo("property", kindModifiers, { start: test.markerByName(markerName).position, length: propertyName.length },
        [{ text: "(", kind: "punctuation" }, { text: "property", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" },
            { text: "c", kind: "className" }, { text: ".", kind: "punctuation" }, { text: propertyName, kind: "propertyName" },
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" }],
        []);
}

function verifyPublicProperty(markerName: string) {
    verifyClassProperty(markerName, "public", "publicProperty");
}

function verifyPrivateProperty(markerName: string) {
    verifyClassProperty(markerName, "private", "privateProperty");
}

function verifyProtectedProperty(markerName: string) {
    verifyClassProperty(markerName, "protected", "protectedProperty");
}

function verifyStaticProperty(markerName: string) {
    verifyClassProperty(markerName, "static", "staticProperty");
}

function verifyPrivateStaticProperty(markerName: string) {
    verifyClassProperty(markerName, "private,static", "privateStaticProperty");
}

function verifyProtectedStaticProperty(markerName: string) {
    verifyClassProperty(markerName, "protected,static", "protectedStaticProperty");
}

verifyPublicProperty('1');
verifyPrivateProperty('2');
verifyProtectedProperty('21');
verifyStaticProperty('3');
verifyPrivateStaticProperty('4');
verifyProtectedStaticProperty('41');

verifyPublicProperty('5');
verifyPrivateProperty('6');
verifyProtectedProperty('61');
verifyStaticProperty('7');
verifyPrivateStaticProperty('8');
verifyProtectedStaticProperty('81');

goTo.marker('9');
verify.verifyQuickInfo("var", "", { start: test.markerByName("9").position, length: "cInstance".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "cInstance", kind: "localName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

verifyPublicProperty('10');

goTo.marker('11');
verify.verifyQuickInfo("class", "", { start: test.markerByName("11").position, length: "c".length },
    [{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

verifyStaticProperty('12');