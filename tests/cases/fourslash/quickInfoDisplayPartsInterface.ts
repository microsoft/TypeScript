/// <reference path='fourslash.ts'/>

////interface /*1*/i {
////}
////var /*2*/iInstance: /*3*/i;

goTo.marker('1');
verify.verifyQuickInfoDisplayParts("interface", "", { start: test.markerByName("1").position, length: "i".length },
    [{ text: "interface", kind: "keyword" }, { text: " ", kind: "space" }, { text: "i", kind: "interfaceName" }],
    []);

goTo.marker('2');
verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName("2").position, length: "iInstance".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "iInstance", kind: "localName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "i", kind: "interfaceName" }],
    []);

goTo.marker('3');
verify.verifyQuickInfoDisplayParts("interface", "", { start: test.markerByName("3").position, length: "i".length },
    [{ text: "interface", kind: "keyword" }, { text: " ", kind: "space" }, { text: "i", kind: "interfaceName" }],
    []);