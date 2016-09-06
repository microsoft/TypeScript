/// <reference path='fourslash.ts'/>

//// class Gre/*1*/eter {
////     someFunction() { th/*2*/is;  }
//// }
////
//// type Options = "opt/*3*/ion 1" | "option 2";
//// let myOption: Options = "option 1";
////
//// some/*4*/Label:
//// break someLabel;

goTo.marker("1");
verify.findReferencesDefinitionDisplayPartsAtCaretAre([{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }, { text: "Greeter", kind: "className" }]);

goTo.marker("2");
verify.findReferencesDefinitionDisplayPartsAtCaretAre([{ text: "this", kind: "keyword" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "this", kind: "keyword" }]);

goTo.marker("3");
verify.findReferencesDefinitionDisplayPartsAtCaretAre([{ text: "\"option 1\"", kind: "stringLiteral" }]);

goTo.marker("4");
verify.findReferencesDefinitionDisplayPartsAtCaretAre([{ text: "someLabel", kind: "text" }]);