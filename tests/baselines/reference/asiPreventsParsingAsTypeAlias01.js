//// [asiPreventsParsingAsTypeAlias01.ts]
var type;
var string;
var Foo;

type
Foo = string;

//// [asiPreventsParsingAsTypeAlias01.js]
var type;
var string;
var Foo;
type;
Foo = string;
