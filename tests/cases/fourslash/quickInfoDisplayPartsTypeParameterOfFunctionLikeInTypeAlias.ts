/// <reference path='fourslash.ts'/>

//// type jamming<A> = new </*0*/A>() => jamming</*1*/A>;
//// type jamming<A> = (new <A>() => jamming<A>) & { constructor: /*2*/A };
//// type jamming<A> = new <A>() => jamming<A> & { constructor: /*3*/A };

let typeAliashDisplayParts = [{ text: "type", kind: "keyword" }, { text: " ", kind: "space" }, { text: "jamming", kind: "aliasName" },
    { text: "<", kind: "punctuation" }, { text: "A", kind: "typeParameterName" }, { text: ">", kind: "punctuation" }];

let typeParameterDisplayParts = [{ text: "(", kind: "punctuation" }, { text: "type parameter", kind: "text" }, { text: ")", kind: "punctuation" }, { text: " ", kind: "space" },
    { text: "A", kind: "typeParameterName" }, { text: " ", kind: "space" }, { text: "in", kind: "keyword" }, { text: " ", kind: "space" }];

let constructorTypeDisplayParts = [{ text: "<", kind: "punctuation" }, { text: "A", kind: "typeParameterName" }, { text: ">", kind: "punctuation" },
    { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" },
    { text: "new", kind: "keyword" }, { "text": " ", kind: "space" }, { text: "<", kind: "punctuation" }, { text: "A", kind: "typeParameterName" }, 
    { text: ">", kind: "punctuation" }, { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" }, {"text": " ", kind: "space" },
    { text: "=>", kind: "punctuation" }, { "text": " ", kind: "space" }, { text: "jamming", kind: "aliasName" }];

let constructorTypeWithLongReturnTypeDisplayParts = [{ "text": "<", kind: "punctuation" }, { "text": "A", kind: "typeParameterName" }, { "text": ">", kind: "punctuation" },
    { "text": "(", kind: "punctuation" }, { "text": ")", kind: "punctuation" }, { "text": ":", kind: "punctuation" }, { "text": " ", kind: "space" }, { "text": "(", kind: "punctuation" },
    { "text": "new", kind: "keyword" }, { "text": " ", kind: "space" }, { "text": "<", kind: "punctuation" }, { "text": "A", kind: "typeParameterName" }, { "text": ">", kind: "punctuation" },
    { "text": "(", kind: "punctuation" }, { "text": ")", kind: "punctuation" }, { "text": " ", kind: "space" }, { "text": "=>", kind: "punctuation" }, { "text": " ", kind: "space" },
    { "text": "jamming", kind: "aliasName" }, { "text": ")", kind: "punctuation" }, { "text": " ", kind: "space" }, { "text": "&", kind: "punctuation" }, { "text": " ", kind: "space" },
    { "text": "{", kind: "punctuation" }, { "text": "\n", kind: "lineBreak" }, { "text": "    ", kind: "space" }, { "text": "constructor", kind: "propertyName" }, { "text": ":", kind: "punctuation" },
    { "text": " ", kind: "space" }, { "text": "A", kind: "typeParameterName" }, {"text":";", kind: "punctuation" }, {"text":"\n", kind: "lineBreak" }, {"text":"}", kind: "punctuation" }];

goTo.marker('0');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("0").position, length: "A".length },
    typeParameterDisplayParts.concat(constructorTypeDisplayParts), []);

goTo.marker('1');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("1").position, length: "A".length },
    typeParameterDisplayParts.concat(constructorTypeDisplayParts), []);

goTo.marker('2');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("2").position, length: "A".length },
    typeParameterDisplayParts.concat(typeAliashDisplayParts), []);

goTo.marker('3');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("3").position, length: "A".length },
    typeParameterDisplayParts.concat(constructorTypeWithLongReturnTypeDisplayParts), []);