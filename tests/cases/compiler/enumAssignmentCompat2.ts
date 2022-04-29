enum W {

    a, b, c,

}

module W {
    export class D { }
}

interface WStatic {

    a: W;

    b: W;

    c: W;

}



var x: WStatic = W;
var y: typeof W = W;
var z: number = W; // error
var a: number = W.a;
var b: typeof W = W.a; // error
var c: typeof W.a = W.a;
var d: typeof W = 3; // error
var e: typeof W.a = 4;
var f: WStatic = W.a; // error
var g: WStatic = 5; // error
var h: W = 3;
var i: W = W.a;
i = W.a;
W.D;
var p: W.D;