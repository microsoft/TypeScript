function foo(x: number, y?:boolean=false, z?=0) {}

class CCC {
    public foo(x: number, y?:boolean=false, z?=0) {}
    static foo2(x: number, y?:boolean=false, z?=0) {}
}

var a = (x?=0) => { return 1; };
var b = (x, y?:number = 2) => { x; };