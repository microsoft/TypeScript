//// [typeVal.ts]
interface I {
    I:number;
}

var I:I = { I: 3};
I.I=4;



//// [typeVal.js]
var I = { I: 3 };
I.I = 4;
