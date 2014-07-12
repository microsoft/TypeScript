/// <reference path='fourslash.ts' />

////module [|{| "name" : "moduleName1" |}foo|] {
////    export class Point {
////        constructor(public x: number, public y: number) { }
////    }
////}
////var p: [|{| "name" : "moduleName2" |}foo|].Point = new [|{| "name" : "moduleName3" |}foo|].Point(1, 1);

var foo1: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "moduleName1")[0];
var foo2: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "moduleName2")[0];
var foo3: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "moduleName3")[0];

goTo.marker('moduleName1');
verify.occurrencesAtPositionContains(foo1);
verify.occurrencesAtPositionContains(foo2);
verify.occurrencesAtPositionContains(foo3);

goTo.marker('moduleName2');
verify.occurrencesAtPositionContains(foo1);
verify.occurrencesAtPositionContains(foo2);
verify.occurrencesAtPositionContains(foo3);

goTo.marker('moduleName3');
verify.occurrencesAtPositionContains(foo1);
verify.occurrencesAtPositionContains(foo2);
verify.occurrencesAtPositionContains(foo3);