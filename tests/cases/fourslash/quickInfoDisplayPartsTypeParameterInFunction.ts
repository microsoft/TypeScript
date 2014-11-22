/// <reference path='fourslash.ts'/>


////function /*1*/foo</*2*/U>(/*3*/a: /*4*/U) {
////    return /*5*/a;
////}
/////*6*/foo("Hello");
////function /*7*/foo2</*8*/U extends string>(/*9*/a: /*10*/U) {
////    return /*11*/a;
////}
/////*12*/foo2("hello");

var marker = 0;
var markerName: string;

function goToMarker() {
    marker++;
    markerName = marker.toString();
    goTo.marker(markerName);
}

function getTypeParameterDisplay(instanceType: ts.SymbolDisplayPart[],
    name: string, optionalExtends?: ts.SymbolDisplayPart[]) {
    return instanceType ||
        function () {
            var typeParameterDisplay = [{ text: name, kind: "typeParameterName" }];
            if (optionalExtends) {
                typeParameterDisplay.push({ text: " ", kind: "space" }, { text: "extends", kind: "keyword" },
                    { text: " ", kind: "space" });
                typeParameterDisplay = typeParameterDisplay.concat(optionalExtends);
            }
            return typeParameterDisplay
        } ();
}

function verifyTypeParameter(name: string, inDisplay: ts.SymbolDisplayPart[]) {
    goToMarker();

    var typeParameterDisplay = [{ text: "(", kind: "punctuation" }, { text: "type parameter", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: name, kind: "typeParameterName" },
        { text: " ", kind: "space" }, { text: "in", kind: "keyword" }, { text: " ", kind: "space" }];
    typeParameterDisplay = typeParameterDisplay.concat(inDisplay);

    verify.verifyQuickInfoDisplayParts("type parameter", "", { start: test.markerByName(markerName).position, length: name.length },
        typeParameterDisplay, []);
}

function verifyParameter(name: string, typeParameterName: string, optionalExtends?: ts.SymbolDisplayPart[]) {
    goToMarker();
    var parameterDisplay = [{ text: "(", kind: "punctuation" }, { text: "parameter", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: name, kind: "parameterName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: typeParameterName, kind: "typeParameterName" }];
    if (optionalExtends) {
        parameterDisplay.push({ text: " ", kind: "space" }, { text: "extends", kind: "keyword" },
            { text: " ", kind: "space" });
        parameterDisplay = parameterDisplay.concat(optionalExtends);
    }
    verify.verifyQuickInfoDisplayParts("parameter", "", { start: test.markerByName(markerName).position, length: name.length },
        parameterDisplay, []);
}

function getFunctionDisplay(name: string, optionalInstanceType?: ts.SymbolDisplayPart[],
    optionalExtends?: ts.SymbolDisplayPart[]) {
    var functionDisplay = [{ text: name, kind: "functionName" }, { text: "<", kind: "punctuation" }];

    functionDisplay = functionDisplay.concat(
        getTypeParameterDisplay(optionalInstanceType, "U", optionalExtends));

    functionDisplay.push({ text: ">", kind: "punctuation" }, { text: "(", kind: "punctuation" },
        { text: "a", kind: "parameterName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" });

    functionDisplay = functionDisplay.concat(
        getTypeParameterDisplay(optionalInstanceType, "U"));

    functionDisplay.push({ text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" });

    functionDisplay = functionDisplay.concat(
        getTypeParameterDisplay(optionalInstanceType, "U"));

    return functionDisplay;
}

function verifyFunctionDisplay(name: string, optionalInstanceType?: ts.SymbolDisplayPart[],
    optionalExtends?: ts.SymbolDisplayPart[]) {
    goToMarker();
    var functionDisplay = [{ text: "(", kind: "punctuation" }, { text: "function", kind: "text" },
        { text: ")", kind: "punctuation" }, { text: " ", kind: "space" }].concat(
        getFunctionDisplay(name, optionalInstanceType, optionalExtends));

    verify.verifyQuickInfoDisplayParts("function", "",
        { start: test.markerByName(markerName).position, length: name.length },
        functionDisplay, []);
}

var stringTypeDisplay = [{ text: "string", kind: "keyword" }];

// Declaration
verifyFunctionDisplay("foo");
verifyTypeParameter("U", getFunctionDisplay("foo"));
verifyParameter("a", "U");
verifyTypeParameter("U", getFunctionDisplay("foo"));
verifyParameter("a", "U");

// Call
verifyFunctionDisplay("foo", stringTypeDisplay);

// With constraint
// Declaration
verifyFunctionDisplay("foo2", /*instance*/ undefined, stringTypeDisplay);
verifyTypeParameter("U", getFunctionDisplay("foo2", /*instance*/ undefined, stringTypeDisplay));
verifyParameter("a", "U", stringTypeDisplay);
verifyTypeParameter("U", getFunctionDisplay("foo2", /*instance*/ undefined, stringTypeDisplay));
verifyParameter("a", "U", stringTypeDisplay);

// Call
verifyFunctionDisplay("foo2", stringTypeDisplay);