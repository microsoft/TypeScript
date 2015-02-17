//// [shadowingViaLocalValue.ts]
{
    let x;
    {
        var x = 1;
    }
}

{
    let x1;
    {
        for (var x1 = 0; ;);
    }
}



//// [shadowingViaLocalValue.js]
{
    var _x = void 0;
    {
        var x = 1;
    }
}
{
    var _x1 = void 0;
    {
        for (var x1 = 0;;)
            ;
    }
}
