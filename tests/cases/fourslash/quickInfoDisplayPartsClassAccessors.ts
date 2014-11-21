/// <reference path='fourslash.ts'/>

////class c {
////    public get /*1*/publicProperty() { return ""; }
////    public set /*1s*/publicProperty(x: string) { }
////    private get /*2*/privateProperty() { return ""; }
////    private set /*2s*/privateProperty(x: string) { }
////    protected get /*21*/protectedProperty() { return ""; }
////    protected set /*21s*/protectedProperty(x: string) { }
////    static get /*3*/staticProperty() { return ""; }
////    static set /*3s*/staticProperty(x: string) { }
////    private static get  /*4*/privateStaticProperty() { return ""; }
////    private static set /*4s*/privateStaticProperty(x: string) { }
////    protected static get /*41*/protectedStaticProperty() { return ""; }
////    protected static set /*41s*/protectedStaticProperty(x: string) { }
////    method() {
////        var x : string;
////        x = this./*5*/publicProperty;
////        x = this./*6*/privateProperty;
////        x = this./*61*/protectedProperty;
////        x = c./*7*/staticProperty;
////        x = c./*8*/privateStaticProperty;
////        x = c./*81*/protectedStaticProperty;
////        this./*5s*/publicProperty = "";
////        this./*6s*/privateProperty = "";
////        this./*61s*/protectedProperty = "";
////        c./*7s*/staticProperty = "";
////        c./*8s*/privateStaticProperty = "";
////        c./*81s*/protectedStaticProperty = "";
////    }
////}
////var cInstance = new c();
////var y: string;
////y = /*9*/cInstance./*10*/publicProperty;
////y = /*11*/c./*12*/staticProperty;
/////*9s*/cInstance./*10s*/publicProperty = y;
/////*11s*/c./*12s*/staticProperty = y;

function verifyClassProperty(markerName: string, kindModifiers: string, propertyName: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfoDisplayParts("property", kindModifiers, { start: test.markerByName(markerName).position, length: propertyName.length },
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
verifyPublicProperty('1s');
verifyPrivateProperty('2');
verifyPrivateProperty('2s');
verifyProtectedProperty('21');
verifyProtectedProperty('21s');
verifyStaticProperty('3');
verifyStaticProperty('3s');
verifyPrivateStaticProperty('4');
verifyPrivateStaticProperty('4s');
verifyProtectedStaticProperty('41');
verifyProtectedStaticProperty('41s');

verifyPublicProperty('5');
verifyPublicProperty('5s');
verifyPrivateProperty('6');
verifyPrivateProperty('6s');
verifyProtectedProperty('61');
verifyProtectedProperty('61s');
verifyStaticProperty('7');
verifyStaticProperty('7s');
verifyPrivateStaticProperty('8');
verifyPrivateStaticProperty('8s');
verifyProtectedStaticProperty('81');
verifyProtectedStaticProperty('81s');

goTo.marker('9');
verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName("9").position, length: "cInstance".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "cInstance", kind: "localName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

verifyPublicProperty('10');

goTo.marker('11');
verify.verifyQuickInfoDisplayParts("class", "", { start: test.markerByName("11").position, length: "c".length },
    [{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

verifyStaticProperty('12');

goTo.marker('9s');
verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName("9s").position, length: "cInstance".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "cInstance", kind: "localName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

verifyPublicProperty('10s');

goTo.marker('11s');
verify.verifyQuickInfoDisplayParts("class", "", { start: test.markerByName("11s").position, length: "c".length },
    [{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

verifyStaticProperty('12s');