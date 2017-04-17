/// <reference path='fourslash.ts'/>

////module m.m1 {
////    export class c {
////    }
////}
////module m2 {
////    import /*1*/a1 = m;
////    new /*2*/a1.m1.c();
////    import /*3*/a2 = m.m1;
////    new /*4*/a2.c();
////    export import /*5*/a3 = m;
////    new /*6*/a3.m1.c();
////    export import /*7*/a4 = m.m1;
////    new /*8*/a4.c();
////}

var marker = 0;
function goToMarker() {
    marker++;
    goTo.marker(marker.toString());
}

function verifyImport(name: string, assigningDisplay:ts.SymbolDisplayPart[], optionalParentName?: string) {
    goToMarker();
    var moduleNameDisplay = [{ text: name, kind: "aliasName" }];
    if (optionalParentName) {
        moduleNameDisplay = [{ text: optionalParentName, kind: "moduleName" }, { text: ".", kind: "punctuation" }].concat(moduleNameDisplay);
    }
    verify.verifyQuickInfoDisplayParts("alias", optionalParentName ? "export" : "", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "import", kind: "keyword" }, { text: " ", kind: "space" }].concat(moduleNameDisplay).concat(
            { text: " ", kind: "space" }, { text: "=", kind: "operator" }, { text: " ", kind: "space" }).concat(assigningDisplay),
        [], []);
}

var moduleMDisplay = [{ text: "m", kind: "moduleName" }];
var moduleMDotM1Display = moduleMDisplay.concat({ text: ".", kind: "punctuation" }, { text: "m1", kind: "moduleName" });

verifyImport("a1", moduleMDisplay);
verifyImport("a1", moduleMDisplay);
verifyImport("a2", moduleMDotM1Display);
verifyImport("a2", moduleMDotM1Display);

verifyImport("a3", moduleMDisplay, "m2");
verifyImport("a3", moduleMDisplay, "m2");
verifyImport("a4", moduleMDotM1Display, "m2");
verifyImport("a4", moduleMDotM1Display, "m2");