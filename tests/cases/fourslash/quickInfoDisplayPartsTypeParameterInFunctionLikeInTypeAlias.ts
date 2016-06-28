/// <reference path='fourslash.ts'/>

//// type MixinCtor<A> = new () => /*0*/A & { constructor: MixinCtor</*1*/A> };
//// type MixinCtor<A> = new () => A & { constructor: { constructor: MixinCtor</*2*/A> } };

let typeAliashDisplayParts = [{ text: "type", kind: "keyword" }, { text: " ", kind: "space" }, { text: "MixinCtor", kind: "aliasName" },
    { text: "<", kind: "punctuation" }, { text: "A", kind: "typeParameterName" }, { text: ">", kind: "punctuation" }];

let typeParameterDisplayParts = [{ text: "(", kind: "punctuation" }, { text: "type parameter", kind: "text" }, { text: ")", kind: "punctuation" }, { text: " ", kind: "space" },
    { text: "A", kind: "typeParameterName" }, { text: " ", kind: "space" }, { text: "in", kind: "keyword" }, { text: " ", kind: "space" }];

goTo.marker('0');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("0").position, length: "A".length },
    typeParameterDisplayParts.concat(typeAliashDisplayParts), []);

goTo.marker('1');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("1").position, length: "A".length },
    typeParameterDisplayParts.concat(typeAliashDisplayParts), []);;

goTo.marker('2');
verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName("2").position, length: "A".length },
    typeParameterDisplayParts.concat(typeAliashDisplayParts), []);