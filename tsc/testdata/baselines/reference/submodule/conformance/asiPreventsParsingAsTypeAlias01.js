//// [tests/cases/conformance/types/typeAliases/asiPreventsParsingAsTypeAlias01.ts] ////

//// [asiPreventsParsingAsTypeAlias01.ts]
var type;
var string;
var Foo;

type
Foo = string;

//// [asiPreventsParsingAsTypeAlias01.js]
"use strict";
var type;
var string;
var Foo;
type;
Foo = string;
