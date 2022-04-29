var foo = (dummy) => { };
function test()
{
    foo(() =>
        function () { return this; }
    );
}