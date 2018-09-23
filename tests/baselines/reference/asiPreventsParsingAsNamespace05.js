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
var a = a || (a = {});
(function (a) {
    var b = a.b || (a.b = {});
    (function (b) {
        b.c = 20;
    })(b);
})(a);
namespace;
a.b.c;
{
}
