/// <reference path='fourslash.ts'/>

////class c {
////    /*1*/constructor() {
////    }
////}
////var /*2*/cInstance = new /*3*/c();
////var /*4*/cVal = /*5*/c;
////class cWithOverloads {
////    /*6*/constructor(x: string);
////    /*7*/constructor(x: number);
////    /*8*/constructor(x: any) {
////    }
////}
////var /*9*/cWithOverloadsInstance = new /*10*/cWithOverloads("hello");
////var /*11*/cWithOverloadsInstance2 = new /*12*/cWithOverloads(10);
////var /*13*/cWithOverloadsVal = /*14*/cWithOverloads;
////class cWithMultipleOverloads {
////    /*15*/constructor(x: string);
////    /*16*/constructor(x: number);
////    /*17*/constructor(x: boolean);
////    /*18*/constructor(x: any) {
////    }
////}
////var /*19*/cWithMultipleOverloadsInstance = new /*20*/cWithMultipleOverloads("hello");
////var /*21*/cWithMultipleOverloadsInstance2 = new /*22*/cWithMultipleOverloads(10);
////var /*23*/cWithMultipleOverloadsInstance3 = new /*24*/cWithMultipleOverloads(true);
////var /*25*/cWithMultipleOverloadsVal = /*26*/cWithMultipleOverloads;

function verifyNonOverloadSignature(marker: string, textSpanLength: number) {
    goTo.marker(marker);
    verify.verifyQuickInfoDisplayParts("constructor", "", { start: test.markerByName(marker).position, length: textSpanLength },
        [{ text: "(", kind: "punctuation" }, { text: "constructor", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "c", kind: "className" },
            { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "c", kind: "className" }],
        []);
}

function verifyClassInstance(markerName: string, instanceName: string, className: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName(markerName).position, length: instanceName.length },
        [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: instanceName, kind: "localName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: className, kind: "className" }],
        []);
}

function verifyClass(markerName: string, className: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfoDisplayParts("class", "", { start: test.markerByName(markerName).position, length: className.length },
        [{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }, { text: className, kind: "className" }],
        []);
}

function verifyTypeOfClass(markerName: string, typeOfVarName: string, className: string) {
    goTo.marker(markerName);
    verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName(markerName).position, length: typeOfVarName.length },
        [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: typeOfVarName, kind: "localName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" },
            { text: "typeof", kind: "keyword" }, { text: " ", kind: "space" }, { text: className, kind: "className" }],
        []);
}

function verifySingleOverloadSignature(marker: string, textSpanLength: number, parameterType: string) {
    goTo.marker(marker);
    verify.verifyQuickInfoDisplayParts("constructor", "", { start: test.markerByName(marker).position, length: textSpanLength },
        [{ text: "(", kind: "punctuation" }, { text: "constructor", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "cWithOverloads", kind: "className" }, { text: "(", kind: "punctuation" },
            { text: "x", kind: "parameterName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: parameterType, kind: "keyword" },
            { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "cWithOverloads", kind: "className" },
            { text: " ", kind: "space" }, { text: "(", kind: "punctuation" },
            { text: "+", kind: "operator" }, { text: "1", kind: "numericLiteral" },
            { text: " ", kind: "space" }, { text: "overload", kind: "text" },
            { text: ")", kind: "punctuation" }],
        []);
}

function verifyMultipleOverloadSignature(marker: string, textSpanLength: number, parameterType: string) {
    goTo.marker(marker);
    verify.verifyQuickInfoDisplayParts("constructor", "", { start: test.markerByName(marker).position, length: textSpanLength },
        [{ text: "(", kind: "punctuation" }, { text: "constructor", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "cWithMultipleOverloads", kind: "className" }, { text: "(", kind: "punctuation" },
            { text: "x", kind: "parameterName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: parameterType, kind: "keyword" },
            { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "cWithMultipleOverloads", kind: "className" },
            { text: " ", kind: "space" }, { text: "(", kind: "punctuation" },
            { text: "+", kind: "operator" }, { text: "2", kind: "numericLiteral" },
            { text: " ", kind: "space" }, { text: "overloads", kind: "text" },
            { text: ")", kind: "punctuation" }],
        []);
}


verifyNonOverloadSignature("1", "constructor".length);
verifyClassInstance("2", "cInstance", "c");
verifyNonOverloadSignature("3", "c".length);
verifyTypeOfClass("4", "cVal", "c");
verifyClass("5", "c");

verifySingleOverloadSignature("6", "constructor".length, "string");
verifySingleOverloadSignature("7", "constructor".length, "number");
verifySingleOverloadSignature("8", "constructor".length, "string");
verifyClassInstance("9", "cWithOverloadsInstance", "cWithOverloads");
verifySingleOverloadSignature("10", "cWithOverloads".length, "string");
verifyClassInstance("11", "cWithOverloadsInstance2", "cWithOverloads");
verifySingleOverloadSignature("12", "cWithOverloads".length, "number");
verifyTypeOfClass("13", "cWithOverloadsVal", "cWithOverloads");
verifyClass("14", "cWithOverloads");

verifyMultipleOverloadSignature("15", "constructor".length, "string");
verifyMultipleOverloadSignature("16", "constructor".length, "number");
verifyMultipleOverloadSignature("17", "constructor".length, "boolean");
verifyMultipleOverloadSignature("18", "constructor".length, "string");
verifyClassInstance("19", "cWithMultipleOverloadsInstance", "cWithMultipleOverloads");
verifyMultipleOverloadSignature("20", "cWithMultipleOverloads".length, "string");
verifyClassInstance("21", "cWithMultipleOverloadsInstance2", "cWithMultipleOverloads");
verifyMultipleOverloadSignature("22", "cWithMultipleOverloads".length, "number");
verifyClassInstance("23", "cWithMultipleOverloadsInstance3", "cWithMultipleOverloads");
verifyMultipleOverloadSignature("24", "cWithMultipleOverloads".length, "boolean");
verifyTypeOfClass("25", "cWithMultipleOverloadsVal", "cWithMultipleOverloads");
verifyClass("26", "cWithMultipleOverloads");