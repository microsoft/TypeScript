interface I {
    new(): any;
}

var i: I;
var f: Object;
f = i;
i = f;

var a: {
    new(): any
}
f = a;
a = f;