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
function verifyVar(name: string, isLocal: boolean, typeDisplay: ts.SymbolDisplayPart[], optionalNameDisplay?: ts.SymbolDisplayPart[], optionalKindModifiers?: string) {
    marker++;
    goTo.marker(marker.toString());
    var kind = isLocal ? "local var" : "var";
    verify.verifyQuickInfoDisplayParts(kind, optionalKindModifiers || "", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "(", kind: "punctuation" }, { text: kind, kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }].concat(optionalNameDisplay || [{ text: name, kind: "localName" }]).concat(
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }).concat(typeDisplay),
        []);
}

var numberTypeDisplay: ts.SymbolDisplayPart[] = [{ text: "number", kind: "keyword" }];

verifyVar("a", /*isLocal*/false, numberTypeDisplay);
verifyVar("b", /*isLocal*/true, numberTypeDisplay);
verifyVar("a", /*isLocal*/false, numberTypeDisplay);
verifyVar("c", /*isLocal*/false, numberTypeDisplay);
verifyVar("d", /*isLocal*/false, numberTypeDisplay, [{ text: "m", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "d", kind: "localName" }], "export");

var functionTypeReturningNumber: ts.SymbolDisplayPart[] = [{ text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" },
    { text: " ", kind: "space" }, { text: "=>", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "number", kind: "keyword" }];
verifyVar("f", /*isLocal*/ false, functionTypeReturningNumber);
verifyVar("g", /*isLocal*/ false, functionTypeReturningNumber);
verifyVar("f", /*isLocal*/ false, functionTypeReturningNumber);
verifyVar("f", /*isLocal*/ false, functionTypeReturningNumber);


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

verifyVar("h", /*isLocal*/ false, typeLiteralWithOverloadCall);
verifyVar("i", /*isLocal*/ false, typeLiteralWithOverloadCall);
verifyVar("h", /*isLocal*/ false, typeLiteralWithOverloadCall);

var overloadDisplay: ts.SymbolDisplayPart[] = [{ text: " ", kind: "space" }, { text: "(", kind: "punctuation" },
    { text: "+", kind: "operator" }, { text: "1", kind: "numericLiteral" },
    { text: " ", kind: "space" }, { text: "overload", kind: "text" }, { text: ")", kind: "punctuation" }];

verifyVar("h", /*isLocal*/ false, getFunctionType("number", "string", /*isArrow*/true).concat(overloadDisplay));
verifyVar("h", /*isLocal*/ false, getFunctionType("string", "number", /*isArrow*/true).concat(overloadDisplay));