/// <reference path='fourslash.ts' />

//// interface I {
////     (): void;
//// }
////
//// var i: I;
//// var [|{| "name" : "varName" |}o|]: Object;
//// [|{| "name" : "varName1" |}o|] = i;
//// i = [|{| "name" : "varName2" |}o|];
////
//// var a: {
////     (): void
//// }
//// [|{| "name" : "varName3" |}o|] = a;
//// a = [|{| "name" : "varName4" |}o|];

var varName: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "varName")[0];
var varName1: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "varName1")[0];
var varName2: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "varName2")[0];
var varName3: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "varName3")[0];
var varName4: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "varName4")[0];

goTo.marker('varName');
verify.occurrencesAtPositionContains(varName1);
verify.occurrencesAtPositionContains(varName2);
verify.occurrencesAtPositionContains(varName3);
verify.occurrencesAtPositionContains(varName4);
