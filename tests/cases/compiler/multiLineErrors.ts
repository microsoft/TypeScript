var t = 32;

function noReturn(): {
    n: string;
    y: number;
}
{
    var x = 4;
    var y = 10;
}

interface A1 {
    x: { y: number; };
}
interface A2 {
    x: { y: string; };
}

var t1: A1;
var t2: A2;
t1 = t2;
