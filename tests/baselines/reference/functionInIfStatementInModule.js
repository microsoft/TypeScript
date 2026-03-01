//// [tests/cases/compiler/functionInIfStatementInModule.ts] ////

//// [functionInIfStatementInModule.ts]
 
namespace Midori
{
    if (false) {
        function Foo(src)
        {
        }
    }
}


//// [functionInIfStatementInModule.js]
"use strict";
var Midori;
(function (Midori) {
    if (false) {
        function Foo(src) {
        }
    }
})(Midori || (Midori = {}));
