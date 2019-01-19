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

var def: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "def")[0];
var imp: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "import")[0];
var mem: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "mem")[0];

verify.occurrencesAtPositionContains(def);
verify.occurrencesAtPositionContains(imp);
verify.occurrencesAtPositionContains(mem);

verify.goToDefinitionIs("def");
