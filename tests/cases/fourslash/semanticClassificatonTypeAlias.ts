/// <reference path="fourslash.ts"/>

////type /*0*/Alias = number
////var x: /*1*/Alias;
////var y = </*2*/Alias>{};
////function f(x: /*3*/Alias): /*4*/Alias { return undefined; }

const c = classification("original");
verify.semanticClassificationsAre("original", 
    c.typeAliasName("Alias", test.marker("0").position),
    c.typeAliasName("Alias", test.marker("1").position),
    c.typeAliasName("Alias", test.marker("2").position),
    c.typeAliasName("Alias", test.marker("3").position),
    c.typeAliasName("Alias", test.marker("4").position)
    );

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("type.declaration", "Alias"), 
    c2.semanticToken("variable.declaration", "x"), 
    c2.semanticToken("type", "Alias"), 
    c2.semanticToken("variable.declaration", "y"), 
    c2.semanticToken("type", "Alias"), 
    c2.semanticToken("function.declaration", "f"), 
    c2.semanticToken("parameter.declaration", "x"), 
    c2.semanticToken("type", "Alias"), 
    c2.semanticToken("type", "Alias"), 
);
