interface I {
    new(): any;
}

declare var i: I;
declare var f: Object;
f = i;
i = f;

declare var a: {
    new(): any
}
f = a;
a = f;