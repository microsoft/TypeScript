/// <reference path='fourslash.ts'/>

// @Filename: quickInfoDisplayPartsExternalModuleAlias_file0.ts
////export module m1 {
////    export class c {
////    }
////}

// @Filename: quickInfoDisplayPartsExternalModuleAlias_file1.ts
////import /*1*/a1 = require(/*mod1*/"quickInfoDisplayPartsExternalModuleAlias_file0");
////new /*2*/a1.m1.c();
////export import /*3*/a2 = require(/*mod2*/"quickInfoDisplayPartsExternalModuleAlias_file0");
////new /*4*/a2.m1.c();

var marker = 0;
function goToMarker() {
    marker++;
    goTo.marker(marker.toString());
}

function verifyImport(name: string, isExported: boolean) {
    goToMarker();
    verify.verifyQuickInfoDisplayParts("alias", isExported ? "export" : "", { start: test.markerByName(marker.toString()).position, length: name.length },
        [{ text: "import", kind: "keyword" }, { text: " ", kind: "space" }, { text: name, kind: "aliasName" },
            { text: " ", kind: "space" }, { text: "=", kind: "operator" }, { text: " ", kind: "space" },
            { text: "require", kind: "keyword" }, { text: "(", kind: "punctuation" },
            { text: "\"quickInfoDisplayPartsExternalModuleAlias_file0\"", kind: "stringLiteral" },
            { text: ")", kind: "punctuation" }],
        []);
}
verifyImport("a1", /*isExported*/false);
verifyImport("a1", /*isExported*/false);
verifyImport("a2", /*isExported*/true);
verifyImport("a2", /*isExported*/true);

function verifyExternalModuleStringLiteral(marker: string) {
    goTo.marker(marker);
    verify.verifyQuickInfoDisplayParts("module", "", { start: test.markerByName(marker).position, length: "\"quickInfoDisplayPartsExternalModuleAlias_file0\"".length },
        [{ text: "module", kind: "keyword" }, { text: " ", kind: "space" }, { text: "a1", kind: "aliasName" }],
        []);
}

verifyExternalModuleStringLiteral("mod1");
verifyExternalModuleStringLiteral("mod2");