/// <reference path='fourslash.ts'/>

////class /*1*/c {
////}
////type /*2*/t1 = /*3*/c;
////var /*4*/cInstance: /*5*/t1 = new /*6*/c();

function verifyClassDisplay(markerName: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfoDisplayParts("class", "", { start: test.markerByName(markerName).position, length: "c".length },
        [{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }, { text: "c", kind: "className" }],
        []);
}

function verifyTypeAliasDisplay(markerName: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfoDisplayParts("type", "", { start: test.markerByName(markerName).position, length: "t1".length },
        [{ text: "type", kind: "keyword" }, { text: " ", kind: "space" }, { text: "t1", kind: "aliasName" },
            { text: " ", kind: "space" }, { text: "=", kind: "operator" }, { text: " ", kind: "space" }, { text: "c", kind: "className" }],
        []);
}

verifyClassDisplay('1');
verifyTypeAliasDisplay('2');
verifyClassDisplay('3');

goTo.marker('4');
verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName("4").position, length: "cInstance".length },
    [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "cInstance", kind: "localName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);

verifyTypeAliasDisplay('5');

goTo.marker('6');
verify.verifyQuickInfoDisplayParts("constructor", "", { start: test.markerByName("6").position, length: "c".length },
    [{ text: "(", kind: "punctuation" }, { text: "constructor", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" },
        { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "c", kind: "className" }],
    []);