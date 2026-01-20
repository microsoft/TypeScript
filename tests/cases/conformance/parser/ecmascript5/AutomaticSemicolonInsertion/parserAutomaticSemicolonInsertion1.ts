interface I {
    (): void;
}
 
declare var i: I;
var o: Object;
o = i;
i = o;
 
declare var a: {
    (): void
}
o = a;
a = o;
