//// [tests/cases/compiler/declFileTypeofClass.ts] ////

//// [declFileTypeofClass.ts]
class c {
    static x : string;
    private static y: number;
    private x3: string;
    public y3: number;
}

var x: c;
var y = c;
var z: typeof c;
class genericC<T>
{
}
var genericX = genericC;


//// [declFileTypeofClass.js]
class c {
    static x;
    static y;
    x3;
    y3;
}
var x;
var y = c;
var z;
class genericC {
}
var genericX = genericC;
