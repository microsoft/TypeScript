interface I {
    (): void;
}
 
var i: I;
var o: Object;
o = i;
i = o;
 
var a: {
    (): void
}
o = a;
a = o;
