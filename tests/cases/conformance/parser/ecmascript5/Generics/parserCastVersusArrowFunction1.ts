// @isolatedDeclarations: false
// @isolatedDeclarationDiffReason: Syntactically invalid.
var v = <T>() => 1;
var v = <T>a;

var v = <T>(a) => 1;
var v = <T>(a, b) => 1;
var v = <T>(a = 1, b = 2) => 1;

var v = <T>(a);
var v = <T>(a, b);
var v = <T>(a = 1, b = 2);