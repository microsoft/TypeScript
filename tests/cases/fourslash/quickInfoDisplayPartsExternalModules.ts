/// <reference path='fourslash.ts'/>

////export module /*1*/m {
////    var /*2*/moduleElemWithoutExport = 10;
////    export var /*3*/moduleElemWithExport = 10;
////}
////export var /*4*/a = /*5*/m;
////export var /*6*/b: typeof /*7*/m;
////export module /*8*/m1./*9*/m2 {
////    var /*10*/moduleElemWithoutExport = 10;
////    export var /*11*/moduleElemWithExport = 10;
////}
////export var /*12*/x = /*13*/m1./*14*/m2;
////export var /*15*/y: typeof /*16*/m1./*17*/m2;

var marker = 0;
function goToMarker() {
    marker++;
    goTo.marker(marker.toString());
}

function verifyModule(name: string, optionalParentName?: string) {
    goToMarker();
    var moduleNameDisplay = [{ text: name, kind: "moduleName" }];
    if (optionalParentName) {
        moduleNameDisplay = [{ text: optionalParentName, kind: "moduleName" }, { text: ".", kind: "punctuation" }].concat(moduleNameDisplay);
    }
    verify.verifyQuickInfoDisplayParts("module", "export", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "module", kind: "keyword" }, { text: " ", kind: "space" }].concat(moduleNameDisplay),
        []);
}

function verifyVar(name: string, optionalFullName?: ts.SymbolDisplayPart[], typeDisplay: ts.SymbolDisplayPart[]= [{ text: "number", kind: "keyword" }]) {
    goToMarker();
    verify.verifyQuickInfoDisplayParts("var", name === "moduleElemWithoutExport" ? "" : "export", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }].concat(optionalFullName || [{ text: name, kind: "localName" }]).concat(
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }).concat(typeDisplay),
        []);
}

verifyModule("m");
verifyVar("moduleElemWithoutExport");
verifyVar("moduleElemWithExport", [{ text: "m", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "moduleElemWithExport", kind: "localName" }]);

verifyVar("a", /*optionalFullName*/ undefined, [{ text: "typeof", kind: "keyword" }, { text: " ", kind: "space" }, { text: "m", kind: "moduleName" }]);
verifyModule("m");
verifyVar("b", /*optionalFullName*/ undefined, [{ text: "typeof", kind: "keyword" }, { text: " ", kind: "space" }, { text: "m", kind: "moduleName" }]);
verifyModule("m");

verifyModule("m1");
verifyModule("m2", "m1");
verifyVar("moduleElemWithoutExport");
verifyVar("moduleElemWithExport", [{ text: "m1", kind: "moduleName" }, { text: ".", kind: "punctuation" },
    { text: "m2", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "moduleElemWithExport", kind: "localName" }]);
verifyVar("x", /*optionalFullName*/ undefined, [{ text: "typeof", kind: "keyword" }, { text: " ", kind: "space" },
    { text: "m1", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "m2", kind: "moduleName" }]);
verifyModule("m1");
verifyModule("m2", "m1");
verifyVar("y", /*optionalFullName*/ undefined, [{ text: "typeof", kind: "keyword" }, { text: " ", kind: "space" },
    { text: "m1", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "m2", kind: "moduleName" }]);
verifyModule("m1");
verifyModule("m2", "m1");
