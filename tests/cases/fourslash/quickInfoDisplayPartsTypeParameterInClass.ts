/// <reference path='fourslash.ts'/>

////class /*1*/c</*2*/T> {
////    /*3*/constructor(/*4*/a: /*5*/T) {
////    }
////    /*6*/method</*7*/U>(/*8*/a: /*9*/U, /*10*/b: /*11*/T) {
////        return /*12*/a;
////    }
////}
////var /*13*/cInstance = new /*14*/c("Hello");
////var /*15*/cVal = /*16*/c;
/////*17*/cInstance./*18*/method("hello", "cello");
////class /*19*/c2</*20*/T extends /*21*/c<string>> {
////    /*22*/constructor(/*23*/a: /*24*/T) {
////    }
////    /*25*/method</*26*/U extends /*27*/c<string>>(/*28*/a: /*29*/U, /*30*/b: /*31*/T) {
////        return /*32*/a;
////    }
////}
////var /*33*/cInstance1 = new /*34*/c2(/*35*/cInstance);
////var /*36*/cVal2 = /*37*/c2;
/////*38*/cInstance1./*39*/method(/*40*/cInstance, /*41*/cInstance);

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

function getClassDisplay(name: string, optionalInstanceType?: ts.SymbolDisplayPart[],
    optionalExtends?: ts.SymbolDisplayPart[]) {
    var classDisplay = [{ text: name, kind: "className" }, { text: "<", kind: "punctuation" }];
    classDisplay = classDisplay.concat(getTypeParameterDisplay(optionalInstanceType, "T", optionalExtends));
    classDisplay.push({ text: ">", kind: "punctuation" });
    return classDisplay;
}

function verifyClassDisplay(name: string, optionalExtends?: ts.SymbolDisplayPart[]) {
    goToMarker();

    verify.verifyQuickInfoDisplayParts("class", "", { start: test.markerByName(markerName).position, length: name.length },
        [{ text: "class", kind: "keyword" }, { text: " ", kind: "space" }].concat(
            getClassDisplay(name, undefined, optionalExtends)), []);
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

function verifyConstructor(name: string, optionalInstanceType?: ts.SymbolDisplayPart[],
    optionalExtends?: ts.SymbolDisplayPart[]) {
    goToMarker();
    var constructorDisplay = [{ text: "(", kind: "punctuation" }, { text: "constructor", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }];
    constructorDisplay = constructorDisplay.concat(getClassDisplay(name, optionalInstanceType, optionalExtends));

    constructorDisplay.push({ text: "(", kind: "punctuation" }, { text: "a", kind: "parameterName" },
        { text: ":", kind: "punctuation" }, { text: " ", kind: "space" });
    
    constructorDisplay = constructorDisplay.concat(
        getTypeParameterDisplay(optionalInstanceType, "T"));

    constructorDisplay.push({ text: ")", kind: "punctuation" },
        { text: ":", kind: "punctuation" }, { text: " ", kind: "space" });

    constructorDisplay = constructorDisplay.concat(getClassDisplay(name, optionalInstanceType));

    verify.verifyQuickInfoDisplayParts("constructor", "", { start: test.markerByName(markerName).position, length: optionalInstanceType ? name.length : "constructor".length },
        constructorDisplay, []);
}

function verifyParameter(name: string, type: string, optionalExtends?: ts.SymbolDisplayPart[]) {
    goToMarker();
    var parameterDisplay = [{ text: "(", kind: "punctuation" }, { text: "parameter", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: name, kind: "parameterName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: type, kind: "typeParameterName" }];
    if (optionalExtends) {
        parameterDisplay.push({ text: " ", kind: "space" }, { text: "extends", kind: "keyword" },
            { text: " ", kind: "space" });
        parameterDisplay = parameterDisplay.concat(optionalExtends);
    }
    verify.verifyQuickInfoDisplayParts("parameter", "", { start: test.markerByName(markerName).position, length: name.length },
        parameterDisplay, []);
}

function getMethodDisplay(name: string, className: string,
    optionalInstanceType?: ts.SymbolDisplayPart[], optionalExtends?: ts.SymbolDisplayPart[]) {
    var functionDisplay = getClassDisplay(className, optionalInstanceType, optionalExtends);

    functionDisplay.push({ text: ".", kind: "punctuation" }, { text: name, kind: "methodName" },
        { text: "<", kind: "punctuation" });

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

    functionDisplay.push({ text: ")", kind: "punctuation" },
        { text: ":", kind: "punctuation" }, { text: " ", kind: "space" });

    functionDisplay = functionDisplay.concat(
        getTypeParameterDisplay(optionalInstanceType, "U"));

    return functionDisplay;
}

function verifyMethodDisplay(name: string, className: string,
    optionalInstanceType?: ts.SymbolDisplayPart[], optionalExtends?: ts.SymbolDisplayPart[]) {
    goToMarker();
    var functionDisplay = [{ text: "(", kind: "punctuation" }, { text: "method", kind: "text" },
        { text: ")", kind: "punctuation" }, { text: " ", kind: "space" }].concat(
        getMethodDisplay(name, className, optionalInstanceType, optionalExtends));

    verify.verifyQuickInfoDisplayParts("method", "",
        { start: test.markerByName(markerName).position, length: name.length },
        functionDisplay, []);
}

function verifyClassInstance(name: string, typeDisplay: ts.SymbolDisplayPart[]) {
    goToMarker();
    verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName(markerName).position, length: name.length },
        [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: name, kind: "localName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }].concat(typeDisplay),
        []);
}

function verifyVarTypeOf(name: string, typeOfSymbol: ts.SymbolDisplayPart) {
    goToMarker();
    verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName(markerName).position, length: name.length },
        [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: name, kind: "localName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "typeof", kind: "keyword" },
            { text: " ", kind: "space" }].concat(typeOfSymbol),
        []);
}

var stringTypeDisplay = [{ text: "string", kind: "keyword" }];
var extendsTypeDisplay = getClassDisplay("c", stringTypeDisplay);

// Declaration
verifyClassDisplay("c");
verifyTypeParameter("T", getClassDisplay("c"));

// Constructor declaration
verifyConstructor("c");
verifyParameter("a", "T");
verifyTypeParameter("T", getClassDisplay("c"));

// Method declaration
verifyMethodDisplay("method", "c");
verifyTypeParameter("U", getMethodDisplay("method", "c"));
verifyParameter("a", "U");
verifyTypeParameter("U", getMethodDisplay("method", "c"));
verifyParameter("b", "T");
verifyTypeParameter("T", getClassDisplay("c"));
verifyParameter("a", "U");

// Instance creation
verifyClassInstance("cInstance", getClassDisplay("c", stringTypeDisplay));
verifyConstructor("c", stringTypeDisplay);

// typeof assignment
verifyVarTypeOf("cVal", { text: "c", kind: "className" });
verifyClassDisplay("c");

// Method call
verifyClassInstance("cInstance", getClassDisplay("c", stringTypeDisplay));
verifyMethodDisplay("method", "c", stringTypeDisplay);

// With constraint
// Declaration
verifyClassDisplay("c2", getClassDisplay("c", stringTypeDisplay));
verifyTypeParameter("T", getClassDisplay("c2", /*instanceType*/undefined, extendsTypeDisplay));
verifyClassDisplay("c");

// Constructor declaration
verifyConstructor("c2", /*instanceType*/undefined, extendsTypeDisplay);
verifyParameter("a", "T", extendsTypeDisplay);
verifyTypeParameter("T", getClassDisplay("c2", /*instanceType*/undefined, extendsTypeDisplay));

// Method declaration
verifyMethodDisplay("method", "c2", /*instance*/undefined, extendsTypeDisplay);
verifyTypeParameter("U", getMethodDisplay("method", "c2", /*instance*/undefined, extendsTypeDisplay));
verifyClassDisplay("c");
verifyParameter("a", "U", extendsTypeDisplay);
verifyTypeParameter("U", getMethodDisplay("method", "c2", /*instance*/undefined, extendsTypeDisplay));
verifyParameter("b", "T", extendsTypeDisplay);
verifyTypeParameter("T", getClassDisplay("c2", /*instanceType*/undefined, extendsTypeDisplay));
verifyParameter("a", "U", extendsTypeDisplay);

// Instance creation
verifyClassInstance("cInstance1", getClassDisplay("c2", extendsTypeDisplay));
verifyConstructor("c2", extendsTypeDisplay);
verifyClassInstance("cInstance", getClassDisplay("c", stringTypeDisplay));

// typeof assignment
verifyVarTypeOf("cVal2", { text: "c2", kind: "className" });
verifyClassDisplay("c2", getClassDisplay("c", stringTypeDisplay));

// Method call
verifyClassInstance("cInstance1", getClassDisplay("c2", extendsTypeDisplay));
verifyMethodDisplay("method", "c2", extendsTypeDisplay);
verifyClassInstance("cInstance", getClassDisplay("c", stringTypeDisplay));
verifyClassInstance("cInstance", getClassDisplay("c", stringTypeDisplay));