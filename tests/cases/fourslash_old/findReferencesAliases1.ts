/// <reference path='fourslash.ts' />

////declare module mod {
////    class Customer {
////        constructor(name: string);
////    }
////}
////import [|{| "name" : "aliasName1" |}c|] = mod.Customer;
////[|{| "name" : "aliasName2" |}c|].prototype;

var name1: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "aliasName1")[0];
var name2: FourSlashInterface.Range = test.ranges().filter(range => range.marker.data.name === "aliasName2")[0];

goTo.marker('aliasName1');
verify.occurrencesAtPositionContains(name1);
verify.occurrencesAtPositionContains(name2);

goTo.marker('aliasName2');
verify.occurrencesAtPositionContains(name1);
verify.occurrencesAtPositionContains(name2);