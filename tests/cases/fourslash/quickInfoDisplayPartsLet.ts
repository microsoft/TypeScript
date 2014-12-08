/// <reference path='fourslash.ts'/>

////let /*1*/a = 10;
////function foo() {
////    let /*2*/b = /*3*/a;
////    if (b) {
////        let /*4*/b1 = 10;
////    }
////}
////module m {
////    let /*5*/c = 10;
////    export let /*6*/d = 10;
////    if (c) {
////        let /*7*/e = 10;
////    }
////}
////let /*8*/f: () => number;
////let /*9*/g = /*10*/f;
/////*11*/f();
////let /*12*/h: { (a: string): number; (a: number): string; };
////let /*13*/i = /*14*/h;
/////*15*/h(10);
/////*16*/h("hello");

var marker = 0;
function verifyVar(name: string, typeDisplay: ts.SymbolDisplayPart[], optionalNameDisplay?: ts.SymbolDisplayPart[], optionalKindModifiers?: string) {
    marker++;
    goTo.marker(marker.toString());
    verify.verifyQuickInfoDisplayParts("let", optionalKindModifiers || "", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "(", kind: "punctuation" }, { text: "let", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }].concat(optionalNameDisplay || [{ text: name, kind: "localName" }]).concat(
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }).concat(typeDisplay),
        []);
}

var numberTypeDisplay: ts.SymbolDisplayPart[] = [{ text: "number", kind: "keyword" }];

verifyVar("a", numberTypeDisplay);
verifyVar("b", numberTypeDisplay);
verifyVar("a", numberTypeDisplay);
verifyVar("b1", numberTypeDisplay);
verifyVar("c", numberTypeDisplay);
verifyVar("d", numberTypeDisplay, [{ text: "m", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "d", kind: "localName" }], "export");
verifyVar("e", numberTypeDisplay);

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