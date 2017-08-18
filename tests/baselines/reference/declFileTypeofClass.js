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
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
var x;
var y = c;
var z;
var genericC = /** @class */ (function () {
    function genericC() {
    }
    return genericC;
}());
var genericX = genericC;


//// [declFileTypeofClass.d.ts]
declare class c {
    static x: string;
    private static y;
    private x3;
    y3: number;
}
declare var x: c;
declare var y: typeof c;
declare var z: typeof c;
declare class genericC<T> {
}
declare var genericX: typeof genericC;
