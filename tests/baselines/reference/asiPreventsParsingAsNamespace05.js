//// [tests/cases/conformance/internalModules/moduleDeclarations/asiPreventsParsingAsNamespace05.ts] ////

//// [asiPreventsParsingAsNamespace05.ts]
let namespace = 10;
namespace a.b {
    export let c = 20;
}

namespace
a.b.c
{
}

//// [asiPreventsParsingAsNamespace05.js]
var namespace = 10;
var a;
(function (a) {
    var b;
    (function (b) {
        b.c = 20;
    })(b = a.b || (a.b = {}));
})(a || (a = {}));
namespace;
a.b.c;
{
}
