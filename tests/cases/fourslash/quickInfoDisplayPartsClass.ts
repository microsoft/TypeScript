/// <reference path='fourslash.ts'/>

////class /*1*/c {
////}
////var /*2*/cInstance = new /*3*/c();
////var /*4*/cVal = /*5*/c;

goTo.marker('1');
verify.verifyQuickInfoDisplayParts("class", "", { start: test.markerByName("1").position, length: "c".length },
    [{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

goTo.marker('2');
verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName("2").position, length: "cInstance".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "cInstance", kind: "localName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

goTo.marker('3');
verify.verifyQuickInfoDisplayParts("constructor", "", { start: test.markerByName("3").position, length: "c".length },
    [{ text: "(", kind: "punctuation" }, { text: "constructor", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" },
        { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

goTo.marker('4');
verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName("4").position, length: "cVal".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "cVal", kind: "localName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "typeof", kind: "keyword" }, { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

goTo.marker('5');
verify.verifyQuickInfoDisplayParts("class", "", { start: test.markerByName("5").position, length: "c".length },
    [{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);