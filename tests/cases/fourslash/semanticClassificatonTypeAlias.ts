/// <reference path="fourslash.ts"/>

////type /*0*/Alias = number
////var x: /*1*/Alias;
////var y = </*2*/Alias>{};
////function f(x: /*3*/Alias): /*4*/Alias { return undefined; }

var c = classification;
verify.semanticClassificationsAre(
    c.typeAlias("Alias", test.marker("0").position),
    c.typeAlias("Alias", test.marker("1").position),
    c.typeAlias("Alias", test.marker("2").position),
    c.typeAlias("Alias", test.marker("3").position),
    c.typeAlias("Alias", test.marker("4").position)
    );