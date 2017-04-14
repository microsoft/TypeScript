//// [asiPreventsParsingAsTypeAlias02.ts]
var type;
var string;
var Foo;

namespace container {
    type
    Foo = string;
}

//// [asiPreventsParsingAsTypeAlias02.js]
var type;
var string;
var Foo;
var container;
(function (container) {
    type;
    Foo = string;
})(container || (container = {}));
