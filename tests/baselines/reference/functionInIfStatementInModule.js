//// [functionInIfStatementInModule.ts]
 
module Midori
{
    if (false) {
        function Foo(src)
        {
        }
    }
}


//// [functionInIfStatementInModule.js]
var Midori = Midori || (Midori = {});
(function (Midori) {
    if (false) {
        function Foo(src) {
        }
    }
})(Midori);
