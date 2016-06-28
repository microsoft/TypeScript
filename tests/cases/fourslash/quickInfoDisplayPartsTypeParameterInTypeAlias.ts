/// <reference path='fourslash.ts'/>

////type /*0*/List</*1*/T> = /*2*/T[]
////type /*3*/List2</*4*/T extends string> = /*5*/T[];

let typeAliashDisplayParts = [{ text: "type", kind: "keyword" }, { text: " ", kind: "space" }, { text: "List", kind: "aliasName" },
    { text: "<", kind: "punctuation" }, { text: "T", kind: "typeParameterName" }, { text: ">", kind: "punctuation" }];

let typeAliashDisplayParts2 = [{ text: "type", kind: "keyword" }, { text: " ", kind: "space" }, { text: "List2", kind: "aliasName" },
    { text: "<", kind: "punctuation" }, { text: "T", kind: "typeParameterName" }, { text: " ", kind: "space" }, { text: "extends", kind: "keyword" },
    { text: " ", kind: "space" }, { text: "string", kind: "keyword" }, { text: ">", kind: "punctuation" }];

let typeParameterDisplayParts = [{ text: "(", kind: "punctuation" }, { text: "type parameter", kind: "text" }, { text: ")", kind: "punctuation" }, { text: " ", kind: "space" },
    { text: "T", kind: "typeParameterName" }, { text: " ", kind: "space" }, { text: "in", kind: "keyword" }, { text: " ", kind: "space" } ]


goTo.marker('0');
verify.verifyQuickInfoDisplayParts("type", "", { start: test.markerByName("0").position, length: "List".length },
    typeAliashDisplayParts.concat([{ text: " ", kind: "space" }, { text: "=", kind: "operator" }, { "text": " ", "kind": "space" }, { text: "T", kind: "typeParameterName" },
        { text: "[", kind: "punctuation" }, { text: "]", kind: "punctuation" }]), []);

goTo.marker('1');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("1").position, length: "T".length },
    typeParameterDisplayParts.concat(typeAliashDisplayParts), []);

goTo.marker('2');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("2").position, length: "T".length },
    typeParameterDisplayParts.concat(typeAliashDisplayParts), []);

goTo.marker('3');
verify.verifyQuickInfoDisplayParts("type", "", { start: test.markerByName("3").position, length: "List2".length },
    typeAliashDisplayParts2.concat([{ text: " ", kind: "space" }, { text: "=", kind: "operator" }, { "text": " ", "kind": "space" }, { text: "T", kind: "typeParameterName" },
        { text: "[", kind: "punctuation" }, { text: "]", kind: "punctuation" }]), []);

goTo.marker('4');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("4").position, length: "T".length },
    typeParameterDisplayParts.concat(typeAliashDisplayParts2), []);

goTo.marker('5');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("5").position, length: "T".length },
    typeParameterDisplayParts.concat(typeAliashDisplayParts2), []);