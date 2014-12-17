/// <reference path='fourslash.ts'/>

////function /*1*/foo(param: string, optionalParam?: string, paramWithInitializer = "hello", ...restParam: string[]) {
////}
////function /*2*/foowithoverload(a: string): string;
////function /*3*/foowithoverload(a: number): number;
////function /*4*/foowithoverload(a: any): any {
////    return a;
////}
////function /*5*/foowith3overload(a: string): string;
////function /*6*/foowith3overload(a: number): number;
////function /*7*/foowith3overload(a: boolean): boolean;
////function /*8*/foowith3overload(a: any): any {
////    return a;
////}
/////*9*/foo("hello");
/////*10*/foowithoverload("hello");
/////*11*/foowithoverload(10);
/////*12*/foowith3overload("hello");
/////*13*/foowith3overload(10);
/////*14*/foowith3overload(true);

var marker = 0;
function verifyFunctionWithoutOverload() {
    marker++;
    goTo.marker(marker.toString());
    verify.verifyQuickInfoDisplayParts("function", "", { start: test.markerByName(marker.toString()).position, length: "foo".length },
        [{ text: "(", kind: "punctuation" }, { text: "function", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "foo", kind: "functionName" }, { text: "(", kind: "punctuation" },
            { text: "param", kind: "parameterName" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" },
            { text: ",", kind: "punctuation" }, { text: " ", kind: "space" },
            { text: "optionalParam", kind: "parameterName" }, { text: "?", kind: "punctuation" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" },
            { text: ",", kind: "punctuation" }, { text: " ", kind: "space" },
            { text: "paramWithInitializer", kind: "parameterName" }, { text: "?", kind: "punctuation" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" },
            { text: ",", kind: "punctuation" }, { text: " ", kind: "space" },
            { text: "...", kind: "punctuation" }, { text: "restParam", kind: "parameterName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "string", kind: "keyword" }, { text: "[", kind: "punctuation" }, { text: "]", kind: "punctuation" },
            { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "void", kind: "keyword" }],
        []);
}

function verifyFunctionWithOverload(functionName: string, type: string, overloadCount: number) {
    marker++;
    goTo.marker(marker.toString());
    verify.verifyQuickInfoDisplayParts("function", "", { start: test.markerByName(marker.toString()).position, length: functionName.length },
        [{ text: "(", kind: "punctuation" }, { text: "function", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: functionName, kind: "functionName" }, { text: "(", kind: "punctuation" },
            { text: "a", kind: "parameterName" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: type, kind: "keyword" },
            { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: type, kind: "keyword" },
            { text: " ", kind: "space" }, { text: "(", kind: "punctuation" }, { text: "+", kind: "operator" }, { text: overloadCount.toString(), kind: "numericLiteral" },
            { text: " ", kind: "space" }, { text: overloadCount === 1 ? "overload" : "overloads", kind: "text" }, { text: ")", kind: "punctuation" }],
        []);
}


// Declarations
verifyFunctionWithoutOverload();

verifyFunctionWithOverload("foowithoverload", "string", 1);
verifyFunctionWithOverload("foowithoverload", "number", 1);
verifyFunctionWithOverload("foowithoverload", "string", 1);

verifyFunctionWithOverload("foowith3overload", "string", 2);
verifyFunctionWithOverload("foowith3overload", "number", 2);
verifyFunctionWithOverload("foowith3overload", "boolean", 2);
verifyFunctionWithOverload("foowith3overload", "string", 2);

// Calls
verifyFunctionWithoutOverload();

verifyFunctionWithOverload("foowithoverload", "string", 1);
verifyFunctionWithOverload("foowithoverload", "number", 1);

verifyFunctionWithOverload("foowith3overload", "string", 2);
verifyFunctionWithOverload("foowith3overload", "number", 2);
verifyFunctionWithOverload("foowith3overload", "boolean", 2);