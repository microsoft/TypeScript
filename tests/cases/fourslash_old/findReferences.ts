/// <reference path='fourslash.ts' />

////class [|{| "name" : "className" |}foo|] {
////    constructor() {
////    }
////    public get [|{| "name" : "barMethodName" |}bar|]() {
////        return 0;
////    }
////    static [|{| "name" : "staticMethodName" |}method|]() { }
////}
////var n: [|{| "name" : "varTypeName" |}foo|] = new [|{| "name" : "ctorInvocation" |}foo|]();
////var x = n.[|{| "name" : "barMethodInvocation" |}bar|]();
////[|{| "name" : "classNameMethodInvocation" |}foo|].[|{| "name" : "staticMethodInvocation" |}method|]();

var foo1: FourSlashInterface.Range = test.ranges().filter((range)=> range.marker.data.name === "className")[0];
var bar1: FourSlashInterface.Range = test.ranges().filter((range)=> range.marker.data.name === "barMethodName")[0];
var method1: FourSlashInterface.Range = test.ranges().filter((range)=> range.marker.data.name === "staticMethodName")[0];
var foo2: FourSlashInterface.Range = test.ranges().filter((range)=> range.marker.data.name === "varTypeName")[0];
var foo3: FourSlashInterface.Range = test.ranges().filter((range)=> range.marker.data.name === "ctorInvocation")[0];
var bar2: FourSlashInterface.Range = test.ranges().filter((range)=> range.marker.data.name === "barMethodInvocation")[0];
var foo4: FourSlashInterface.Range = test.ranges().filter((range)=> range.marker.data.name === "classNameMethodInvocation")[0];
var method2: FourSlashInterface.Range = test.ranges().filter((range)=> range.marker.data.name === "staticMethodInvocation")[0];

goTo.marker('className');
verify.occurrencesAtPositionContains(foo1);
verify.occurrencesAtPositionContains(foo2);
verify.occurrencesAtPositionContains(foo3);
verify.occurrencesAtPositionContains(foo4);

goTo.marker('barMethodName');
verify.occurrencesAtPositionContains(bar1);
verify.occurrencesAtPositionContains(bar2);

goTo.marker('staticMethodName');
verify.occurrencesAtPositionContains(method1);
verify.occurrencesAtPositionContains(method2);

goTo.marker('varTypeName');
verify.occurrencesAtPositionContains(foo1);
verify.occurrencesAtPositionContains(foo2);
verify.occurrencesAtPositionContains(foo3);
verify.occurrencesAtPositionContains(foo4);

goTo.marker('ctorInvocation');
verify.occurrencesAtPositionContains(foo1);
verify.occurrencesAtPositionContains(foo2);
verify.occurrencesAtPositionContains(foo3);
verify.occurrencesAtPositionContains(foo4);

goTo.marker('barMethodInvocation');
verify.occurrencesAtPositionContains(bar1);
verify.occurrencesAtPositionContains(bar2);

goTo.marker('classNameMethodInvocation');
verify.occurrencesAtPositionContains(foo1);
verify.occurrencesAtPositionContains(foo2);
verify.occurrencesAtPositionContains(foo3);
verify.occurrencesAtPositionContains(foo4);

goTo.marker('staticMethodInvocation');
verify.occurrencesAtPositionContains(method1);
verify.occurrencesAtPositionContains(method2);