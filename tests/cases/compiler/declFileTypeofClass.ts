// @declaration: true

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
