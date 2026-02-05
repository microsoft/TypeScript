//// [tests/cases/conformance/types/typeAliases/asiPreventsParsingAsTypeAlias02.ts] ////

//// [asiPreventsParsingAsTypeAlias02.ts]
var type;
var string;
var Foo;

namespace container {
    type
    Foo = string;
}

//// [asiPreventsParsingAsTypeAlias02.js]
"use strict";
var type;
var string;
var Foo;
var container;
(function (container) {
    type;
    Foo = string;
})(container || (container = {}));
