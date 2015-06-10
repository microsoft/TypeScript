/// <reference path='fourslash.ts'/>

////var /*1*/a = 10;
////function foo() {
////    var /*2*/b = /*3*/a;
////}
////module m {
////    var /*4*/c = 10;
////    export var /*5*/d = 10;
////}
////var /*6*/f: () => number;
////var /*7*/g = /*8*/f;
/////*9*/f();
////var /*10*/h: { (a: string): number; (a: number): string; };
////var /*11*/i = /*12*/h;
/////*13*/h(10);
/////*14*/h("hello");
var marker = 0;
function verifyVar(name: string, typeDisplay: ts.SymbolDisplayPart[], optionalNameDisplay?: ts.SymbolDisplayPart[], optionalKindModifiers?: string) {
    marker++;
    goTo.marker(marker.toString());
    var kind = "var";
    verify.verifyQuickInfoDisplayParts(kind, optionalKindModifiers || "", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "var", kind: "keyword" },
            { text: " ", kind: "space" }].concat(optionalNameDisplay || [{ text: name, kind: "localName" }]).concat(
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }).concat(typeDisplay),
        []);
}
function verifyLocalVar(name: string, typeDisplay: ts.SymbolDisplayPart[], optionalNameDisplay?: ts.SymbolDisplayPart[], optionalKindModifiers?: string) {
    marker++;
    goTo.marker(marker.toString());
    var kind = "local var";
    verify.verifyQuickInfoDisplayParts(kind, optionalKindModifiers || "", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "(", kind: "punctuation" }, { text: kind, kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }].concat(optionalNameDisplay || [{ text: name, kind: "localName" }]).concat(
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }).concat(typeDisplay),
        []);
}


var numberTypeDisplay: ts.SymbolDisplayPart[] = [{ text: "number", kind: "keyword" }];

verifyVar("a", numberTypeDisplay);
verifyLocalVar("b", numberTypeDisplay);
verifyVar("a", numberTypeDisplay);
verifyVar("c", numberTypeDisplay);
verifyVar("d", numberTypeDisplay, [{ text: "m", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "d", kind: "localName" }], "export");

var functionTypeReturningNumber: ts.SymbolDisplayPart[] = [{ text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" },
    { text: " ", kind: "space" }, { text: "=>", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "number", kind: "keyword" }];
verifyVar("f", functionTypeReturningNumber);
verifyVar("g", functionTypeReturningNumber);
verifyVar("f", functionTypeReturningNumber);
verifyVar("f", functionTypeReturningNumber);


function getFunctionType(parametertype: string, returnType: string, isArrow?: boolean): ts.SymbolDisplayPart[] {
    var functionTypeDisplay = [{ text: "(", kind: "punctuation" }, { text: "a", kind: "parameterName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: parametertype, kind: "keyword" }, { text: ")", kind: "punctuation" }];

    if (isArrow) {
        functionTypeDisplay = functionTypeDisplay.concat({ text: " ", kind: "space" }, { text: "=>", kind: "punctuation" });
    }
    else {
        functionTypeDisplay = functionTypeDisplay.concat({ text: ":", kind: "punctuation" });
    }

    return functionTypeDisplay.concat({ text: " ", kind: "space" }, { text: returnType, kind: "keyword" });
}

var typeLiteralWithOverloadCall: ts.SymbolDisplayPart[] = [{ text: "{", kind: "punctuation" }, { text: "\n", kind: "lineBreak" },
    { text: "    ", kind: "space" }].concat(getFunctionType("string", "number")).concat(
    { text: ";", kind: "punctuation" }, { text: "\n", kind: "lineBreak" },
    { text: "    ", kind: "space" }).concat(getFunctionType("number", "string")).concat(
    { text: ";", kind: "punctuation" }, { text: "\n", kind: "lineBreak" }, { text: "}", kind: "punctuation" });

verifyVar("h", typeLiteralWithOverloadCall);
verifyVar("i", typeLiteralWithOverloadCall);
verifyVar("h", typeLiteralWithOverloadCall);

var overloadDisplay: ts.SymbolDisplayPart[] = [{ text: " ", kind: "space" }, { text: "(", kind: "punctuation" },
    { text: "+", kind: "operator" }, { text: "1", kind: "numericLiteral" },
    { text: " ", kind: "space" }, { text: "overload", kind: "text" }, { text: ")", kind: "punctuation" }];

verifyVar("h", getFunctionType("number", "string", /*isArrow*/true).concat(overloadDisplay));
verifyVar("h", getFunctionType("string", "number", /*isArrow*/true).concat(overloadDisplay));