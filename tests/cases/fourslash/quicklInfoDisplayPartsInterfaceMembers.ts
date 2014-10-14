/// <reference path='fourslash.ts'/>

////interface I {
////    /*1*/property: string;
////    /*2*/method(): string;
////    (): string;
////    new (): I;
////}
////var iInstance: I;
/////*3*/iInstance./*4*/property = /*5*/iInstance./*6*/method();
/////*7*/iInstance();
////var /*8*/anotherInstance = new /*9*/iInstance();

function verifyInterfaceProperty(markerName: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfo("property", "", { start: test.markerByName(markerName).position, length: "property".length },
        [{ text: "(", kind: "punctuation" }, { text: "property", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" },
            { text: "I", kind: "interfaceName" }, { text: ".", kind: "punctuation" }, { text: "property", kind: "propertyName" },
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" }],
        []);
}

function verifyInterfaceMethod(markerName: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfo("method", "", { start: test.markerByName(markerName).position, length: "method".length },
        [{ text: "(", kind: "punctuation" }, { text: "method", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" },
            { text: "I", kind: "interfaceName" }, { text: ".", kind: "punctuation" }, { text: "method", kind: "methodName" },
            { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" },
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" }],
        []);
}

function verifyInterfaceInstanceVar(markerName: string, instanceName: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfo("var", "", { start: test.markerByName(markerName).position, length: instanceName.length },
        [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: instanceName, kind: "localName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "I", kind: "interfaceName" }],
        []);
}

verifyInterfaceProperty('1');
verifyInterfaceMethod("2");

verifyInterfaceInstanceVar("3", "iInstance");
verifyInterfaceProperty("4");
verifyInterfaceInstanceVar("5", "iInstance");
verifyInterfaceMethod("6");
 
// Call signature
goTo.marker("7");
verify.verifyQuickInfo("var", "", { start: test.markerByName("7").position, length: "iInstance".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "iInstance", kind: "localName" },
        { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "I", kind: "interfaceName" },
        { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "=>", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "string", kind: "keyword" }],
    []);

verifyInterfaceInstanceVar("8", "anotherInstance");

// Cosntruct signature
goTo.marker("9");
verify.verifyQuickInfo("var", "", { start: test.markerByName("9").position, length: "iInstance".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "iInstance", kind: "localName" },
        { text: ":", kind: "punctuation" }, { text: " ", kind: "space" },
        { text: "new", kind: "keyword" }, { text: " ", kind: "space" }, { text: "I", kind: "interfaceName" },
        { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "=>", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "I", kind: "interfaceName" }],
    []);