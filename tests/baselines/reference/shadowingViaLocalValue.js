//// [tests/cases/compiler/shadowingViaLocalValue.ts] ////

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
"use strict";
{
    var x_1;
    {
        var x = 1;
    }
}
{
    var x1_1;
    {
        for (var x1 = 0;;)
            ;
    }
}
