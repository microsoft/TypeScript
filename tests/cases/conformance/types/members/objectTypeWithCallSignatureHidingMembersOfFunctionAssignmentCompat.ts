interface I {
    (): void;
}

var i: I;
var f: Object;
f = i;
i = f;

var a: {
    (): void
}
f = a;
a = f;