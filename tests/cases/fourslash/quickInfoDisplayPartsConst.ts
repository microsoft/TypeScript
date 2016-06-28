/// <reference path='fourslash.ts'/>

////const /*1*/a = 10;
////function foo() {
////    const /*2*/b = /*3*/a;
////    if (b) {
////        const /*4*/b1 = 10;
////    }
////}
////module m {
////    const /*5*/c = 10;
////    export const /*6*/d = 10;
////    if (c) {
////        const /*7*/e = 10;
////    }
////}
////const /*8*/f: () => number = () => 10;
////const /*9*/g = /*10*/f;
/////*11*/f();
////const /*12*/h: { (a: string): number; (a: number): string; } = a => a;
////const /*13*/i = /*14*/h;
/////*15*/h(10);
/////*16*/h("hello");

var marker = 0;
function verifyConst(name: string, typeDisplay: ts.SymbolDisplayPart[], optionalNameDisplay?: ts.SymbolDisplayPart[], optionalKindModifiers?: string) {
    marker++;
    goTo.marker(marker.toString());
    verify.verifyQuickInfoDisplayParts("const", optionalKindModifiers || "", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "const", kind: "keyword" },
            { text: " ", kind: "space" }].concat(optionalNameDisplay || [{ text: name, kind: "localName" }]).concat(
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }).concat(typeDisplay),
        []);
}

var numberTypeDisplay: ts.SymbolDisplayPart[] = [{ text: "number", kind: "keyword" }];

verifyConst("a", numberTypeDisplay);
verifyConst("b", numberTypeDisplay);
verifyConst("a", numberTypeDisplay);
verifyConst("b1", numberTypeDisplay);
verifyConst("c", numberTypeDisplay);
verifyConst("d", numberTypeDisplay, [{ text: "m", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "d", kind: "localName" }], "export");
verifyConst("e", numberTypeDisplay);

var functionTypeReturningNumber: ts.SymbolDisplayPart[] = [{ text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" },
    { text: " ", kind: "space" }, { text: "=>", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "number", kind: "keyword" }];
verifyConst("f", functionTypeReturningNumber);
verifyConst("g", functionTypeReturningNumber);
verifyConst("f", functionTypeReturningNumber);
verifyConst("f", functionTypeReturningNumber);


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

verifyConst("h", typeLiteralWithOverloadCall);
verifyConst("i", typeLiteralWithOverloadCall);
verifyConst("h", typeLiteralWithOverloadCall);

var overloadDisplay: ts.SymbolDisplayPart[] = [{ text: " ", kind: "space" }, { text: "(", kind: "punctuation" },
    { text: "+", kind: "operator" }, { text: "1", kind: "numericLiteral" },
    { text: " ", kind: "space" }, { text: "overload", kind: "text" }, { text: ")", kind: "punctuation" }];

verifyConst("h", getFunctionType("number", "string", /*isArrow*/true).concat(overloadDisplay));
verifyConst("h", getFunctionType("string", "number", /*isArrow*/true).concat(overloadDisplay));