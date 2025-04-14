/// <reference path="fourslash.ts" />

////module Alpha {
////    export var [|{| "name" : "def" |}x|] = 100;
////}
////
////module Beta {
////    import p = Alpha.[|{| "name" : "import" |}x|];
////}
////
////var x = Alpha.[|{| "name" : "mem" |}x|]

goTo.marker('import');
verify.completions({ includes: { name: "x", text: "var Alpha.x: number" } });

verify.baselineDocumentHighlights("import");
verify.baselineGetDefinitionAtPosition("import");