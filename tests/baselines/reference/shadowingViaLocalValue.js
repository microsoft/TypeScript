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
    let x;
    {
        var x = 1;
    }
}
{
    let x1;
    {
        for (var x1 = 0;;)
            ;
    }
}
