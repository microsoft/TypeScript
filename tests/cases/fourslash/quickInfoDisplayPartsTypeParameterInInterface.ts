/// <reference path='fourslash.ts'/>

////interface /*1*/I</*2*/T> {
////    new </*3*/U>(/*4*/a: /*5*/U, /*6*/b: /*7*/T): /*8*/U;
////    </*9*/U>(/*10*/a: /*11*/U, /*12*/b: /*13*/T): /*14*/U;
////    /*15*/method</*16*/U>(/*17*/a: /*18*/U, /*19*/b: /*20*/T): /*21*/U;
////}
////var /*22*/iVal: /*23*/I<string>;
////new /*24*/iVal("hello", "hello");
/////*25*/iVal("hello", "hello");
/////*26*/iVal./*27*/method("hello", "hello");
////interface /*28*/I1</*29*/T extends /*30*/I<string>> {
////    new </*31*/U extends /*32*/I<string>>(/*33*/a: /*34*/U, /*35*/b: /*36*/T): /*37*/U;
////    </*38*/U extends /*39*/I<string>>(/*40*/a: /*41*/U, /*42*/b: /*43*/T): /*44*/U;
////    /*45*/method</*46*/U extends /*47*/I<string>>(/*48*/a: /*49*/U, /*50*/b: /*51*/T): /*52*/U;
////}
////var /*53*/iVal1: /*54*/I1</*55*/I<string>>;
////new /*56*/iVal1(/*57*/iVal, /*58*/iVal);
/////*59*/iVal1(/*60*/iVal, /*61*/iVal);
/////*62*/iVal1./*63*/method(/*64*/iVal, /*65*/iVal);

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

function getInterfaceDisplay(name: string, optionalInstanceType?: ts.SymbolDisplayPart[],
    optionalExtends?: ts.SymbolDisplayPart[]) {
    var interfaceDisplay = [{ text: name, kind: "interfaceName" }, { text: "<", kind: "punctuation" }];
    interfaceDisplay = interfaceDisplay.concat(getTypeParameterDisplay(optionalInstanceType, "T", optionalExtends));
    interfaceDisplay.push({ text: ">", kind: "punctuation" });
    return interfaceDisplay;
}

function verifyInterfaceDisplay(name: string, optionalExtends?: ts.SymbolDisplayPart[]) {
    goToMarker();

    verify.verifyQuickInfoDisplayParts("interface", "", { start: test.markerByName(markerName).position, length: name.length },
        [{ text: "interface", kind: "keyword" }, { text: " ", kind: "space" }].concat(
            getInterfaceDisplay(name, undefined, optionalExtends)), []);
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

function getSignatureDisplay(isArrow: boolean, optionalInstanceType?: ts.SymbolDisplayPart[],
    optionalExtends?: ts.SymbolDisplayPart[]) {
    var functionDisplay: ts.SymbolDisplayPart[] = [];

    functionDisplay.push({ text: "<", kind: "punctuation" });

    functionDisplay = functionDisplay.concat(
        getTypeParameterDisplay(optionalInstanceType, "U", optionalExtends));

    functionDisplay.push({ text: ">", kind: "punctuation" }, { text: "(", kind: "punctuation" },
        { text: "a", kind: "parameterName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" });
    functionDisplay = functionDisplay.concat(
        getTypeParameterDisplay(optionalInstanceType, "U"));
    functionDisplay.push({ text: ",", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "b", kind: "parameterName" },
        { text: ":", kind: "punctuation" }, { text: " ", kind: "space" });
    functionDisplay = functionDisplay.concat(
        getTypeParameterDisplay(optionalInstanceType, "T"));

    functionDisplay.push({ text: ")", kind: "punctuation" });
    if (isArrow) {
        functionDisplay.push({ text: " ", kind: "space" }, { text: "=>", kind: "punctuation" });
    }
    else {
        functionDisplay.push({ text: ":", kind: "punctuation" });
    }
    functionDisplay.push({ text: " ", kind: "space" });

    functionDisplay = functionDisplay.concat(
        getTypeParameterDisplay(optionalInstanceType, "U"));

    return functionDisplay;
}

function getMethodDisplay(name: string, interfaceName: string, optionalInstanceType?: ts.SymbolDisplayPart[],
    optionalExtends?: ts.SymbolDisplayPart[]) {
    return getInterfaceDisplay(interfaceName, optionalInstanceType, optionalExtends).concat(
        { text: ".", kind: "punctuation" }, { text: name, kind: "methodName" }).concat(
        getSignatureDisplay(/*isArrow*/ false, optionalInstanceType, optionalExtends));
}

function getCallOrNewSignatureDisplay(isNew: boolean, isArrow: boolean, interfaceName?: string,
    optionalInstanceType?: ts.SymbolDisplayPart[], optionalExtends?: ts.SymbolDisplayPart[]) {
    var result: ts.SymbolDisplayPart[] = [];
    if (isNew) {
        result.push({ text: "new", kind: "keyword" }, { text: " ", kind: "space" });
    }
    if (interfaceName) {
        result.push({ text: interfaceName, kind: "interfaceName" });
    }

    return result.concat(getSignatureDisplay(isArrow, optionalInstanceType, optionalExtends));
}

function verifyMethodDisplay(name: string, interfaceName: string,
    optionalInstanceType?: ts.SymbolDisplayPart[], optionalExtends?: ts.SymbolDisplayPart[]) {
    goToMarker();
    var functionDisplay = [{ text: "(", kind: "punctuation" }, { text: "method", kind: "text" },
        { text: ")", kind: "punctuation" }, { text: " ", kind: "space" }].concat(
        getMethodDisplay(name, interfaceName, optionalInstanceType, optionalExtends));

    verify.verifyQuickInfoDisplayParts("method", "",
        { start: test.markerByName(markerName).position, length: name.length },
        functionDisplay, []);
}

function verifyInterfaceVar(name: string, typeDisplay: ts.SymbolDisplayPart[]) {
    goToMarker();
    verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName(markerName).position, length: name.length },
        [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: name, kind: "localName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }].concat(typeDisplay),
        []);
}

var stringTypeDisplay = [{ text: "string", kind: "keyword" }];
var extendsTypeDisplay = getInterfaceDisplay("I", stringTypeDisplay);


// Declaration
verifyInterfaceDisplay("I");
verifyTypeParameter("T", getInterfaceDisplay("I"));

// New declaration
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ true, /*isArrow*/ false));
verifyParameter("a", "U");
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ true, /*isArrow*/ false));
verifyParameter("b", "T");
verifyTypeParameter("T", getInterfaceDisplay("I"));
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ true, /*isArrow*/ false));

// Call declaration
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ false, /*isArrow*/ false));
verifyParameter("a", "U");
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ false, /*isArrow*/ false));
verifyParameter("b", "T");
verifyTypeParameter("T", getInterfaceDisplay("I"));
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ false, /*isArrow*/ false));

// Method declaration
verifyMethodDisplay("method", "I");
verifyTypeParameter("U", getMethodDisplay("method", "I"));
verifyParameter("a", "U");
verifyTypeParameter("U", getMethodDisplay("method", "I"));
verifyParameter("b", "T");
verifyTypeParameter("T", getInterfaceDisplay("I"));
verifyTypeParameter("U", getMethodDisplay("method", "I"));

// Instance
verifyInterfaceVar("iVal", getInterfaceDisplay("I", stringTypeDisplay));
verifyInterfaceDisplay("I");

// new 
verifyInterfaceVar("iVal", getCallOrNewSignatureDisplay(/*isNew*/ true, /*isArrow*/ true, "I", stringTypeDisplay));

// call 
verifyInterfaceVar("iVal", getCallOrNewSignatureDisplay(/*isNew*/ false, /*isArrow*/ true, "I", stringTypeDisplay));

// Method call
verifyInterfaceVar("iVal", getInterfaceDisplay("I", stringTypeDisplay));
verifyMethodDisplay("method", "I", stringTypeDisplay);

// With constraint
// Declaration
verifyInterfaceDisplay("I1", extendsTypeDisplay);
verifyTypeParameter("T", getInterfaceDisplay("I1", /*instance*/undefined, extendsTypeDisplay));
verifyInterfaceDisplay("I");

// New declaration
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ true, /*isArrow*/ false, /*interfaceName*/undefined, /*instance*/undefined, extendsTypeDisplay));
verifyInterfaceDisplay("I");
verifyParameter("a", "U", extendsTypeDisplay);
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ true, /*isArrow*/ false, /*interfaceName*/undefined, /*instance*/undefined, extendsTypeDisplay));
verifyParameter("b", "T", extendsTypeDisplay);
verifyTypeParameter("T", getInterfaceDisplay("I1", /*instance*/undefined, extendsTypeDisplay));
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ true, /*isArrow*/ false, /*interfaceName*/undefined, /*instance*/undefined, extendsTypeDisplay));

// Call declaration
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ false, /*isArrow*/ false, /*interfaceName*/undefined, /*instance*/undefined, extendsTypeDisplay));
verifyInterfaceDisplay("I");
verifyParameter("a", "U", extendsTypeDisplay);
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ false, /*isArrow*/ false, /*interfaceName*/undefined, /*instance*/undefined, extendsTypeDisplay));
verifyParameter("b", "T", extendsTypeDisplay);
verifyTypeParameter("T", getInterfaceDisplay("I1", /*instance*/undefined, extendsTypeDisplay));
verifyTypeParameter("U", getCallOrNewSignatureDisplay(/*isNew*/ false, /*isArrow*/ false, /*interfaceName*/undefined, /*instance*/undefined, extendsTypeDisplay));

// Method declaration
verifyMethodDisplay("method", "I1", /*instance*/ undefined, extendsTypeDisplay);
verifyTypeParameter("U", getMethodDisplay("method", "I1", /*instance*/ undefined, extendsTypeDisplay));
verifyInterfaceDisplay("I");
verifyParameter("a", "U", extendsTypeDisplay);
verifyTypeParameter("U", getMethodDisplay("method", "I1", /*instance*/ undefined, extendsTypeDisplay));
verifyParameter("b", "T", extendsTypeDisplay);
verifyTypeParameter("T", getInterfaceDisplay("I1", /*instance*/undefined, extendsTypeDisplay));
verifyTypeParameter("U", getMethodDisplay("method", "I1", /*instance*/ undefined, extendsTypeDisplay));

// Instance
verifyInterfaceVar("iVal1", getInterfaceDisplay("I1", extendsTypeDisplay));
verifyInterfaceDisplay("I1", extendsTypeDisplay);
verifyInterfaceDisplay("I");

// new 
verifyInterfaceVar("iVal1", getCallOrNewSignatureDisplay(/*isNew*/ true, /*isArrow*/ true, "I1", extendsTypeDisplay));
verifyInterfaceVar("iVal", getInterfaceDisplay("I", stringTypeDisplay));
verifyInterfaceVar("iVal", getInterfaceDisplay("I", stringTypeDisplay));

// call 
verifyInterfaceVar("iVal1", getCallOrNewSignatureDisplay(/*isNew*/ false, /*isArrow*/ true, "I1", extendsTypeDisplay));
verifyInterfaceVar("iVal", getInterfaceDisplay("I", stringTypeDisplay));
verifyInterfaceVar("iVal", getInterfaceDisplay("I", stringTypeDisplay));

// Method call
verifyInterfaceVar("iVal1", getInterfaceDisplay("I1", extendsTypeDisplay));
verifyMethodDisplay("method", "I1", extendsTypeDisplay);
verifyInterfaceVar("iVal", getInterfaceDisplay("I", stringTypeDisplay));
verifyInterfaceVar("iVal", getInterfaceDisplay("I", stringTypeDisplay));
