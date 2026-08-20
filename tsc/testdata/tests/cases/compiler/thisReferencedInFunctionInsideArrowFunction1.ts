// @target: es2015
// @strict: false
var foo = (dummy) => { };
function test()
{
    foo(() =>
        function () { return this; }
    );
}