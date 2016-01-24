/// <reference path='fourslash.ts'/>

////namespace /*1*/m {
////    var /*2*/namespaceElemWithoutExport = 10;
////    export var /*3*/namespaceElemWithExport = 10;
////}
////var /*4*/a = /*5*/m;
////var /*6*/b: typeof /*7*/m;
////namespace /*8*/m1./*9*/m2 {
////    var /*10*/namespaceElemWithoutExport = 10;
////    export var /*11*/namespaceElemWithExport = 10;
////}
////var /*12*/x = /*13*/m1./*14*/m2;
////var /*15*/y: typeof /*16*/m1./*17*/m2;

var marker = 0;
function goToMarker() {
    marker++;
    goTo.marker(marker.toString());
}

function verifyNamespace(name: string, optionalParentName?: string) {
    goToMarker();
    var namespaceNameDisplay = [{ text: name, kind: "moduleName" }];
    if (optionalParentName) {
        namespaceNameDisplay = [{ text: optionalParentName, kind: "moduleName" }, { text: ".", kind: "punctuation" }].concat(namespaceNameDisplay);
    }
    verify.verifyQuickInfoDisplayParts("module", optionalParentName ? "export" : "", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "namespace", kind: "keyword" }, { text: " ", kind: "space" }].concat(namespaceNameDisplay),
        []);
}

function verifyVar(name: string, optionalFullName?: ts.SymbolDisplayPart[], typeDisplay: ts.SymbolDisplayPart[]= [{ text: "number", kind: "keyword" }]) {
    goToMarker();
    verify.verifyQuickInfoDisplayParts("var", optionalFullName ? "export" : "", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "var", kind: "keyword" },
            { text: " ", kind: "space" }].concat(optionalFullName || [{ text: name, kind: "localName" }]).concat(
            { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }).concat(typeDisplay),
        []);
}

verifyNamespace("m");
verifyVar("namespaceElemWithoutExport");
verifyVar("namespaceElemWithExport", [{ text: "m", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "namespaceElemWithExport", kind: "localName" }]);

verifyVar("a", /*optionalFullName*/ undefined, [{ text: "typeof", kind: "keyword" }, { text: " ", kind: "space" }, { text: "m", kind: "moduleName" }]);
verifyNamespace("m");
verifyVar("b", /*optionalFullName*/ undefined, [{ text: "typeof", kind: "keyword" }, { text: " ", kind: "space" }, { text: "m", kind: "moduleName" }]);
verifyNamespace("m");

verifyNamespace("m1");
verifyNamespace("m2", "m1");
verifyVar("namespaceElemWithoutExport");
verifyVar("namespaceElemWithExport", [{ text: "m1", kind: "moduleName" }, { text: ".", kind: "punctuation" },
    { text: "m2", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "namespaceElemWithExport", kind: "localName" }]);
verifyVar("x", /*optionalFullName*/ undefined, [{ text: "typeof", kind: "keyword" }, { text: " ", kind: "space" },
    { text: "m1", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "m2", kind: "moduleName" }]);
verifyNamespace("m1");
verifyNamespace("m2", "m1");
verifyVar("y", /*optionalFullName*/ undefined, [{ text: "typeof", kind: "keyword" }, { text: " ", kind: "space" },
    { text: "m1", kind: "moduleName" }, { text: ".", kind: "punctuation" }, { text: "m2", kind: "moduleName" }]);
verifyNamespace("m1");
verifyNamespace("m2", "m1");
