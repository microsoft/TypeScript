interface I {
    (): void;
}

declare var i: I;
declare var f: Object;
f = i;
i = f;

declare var a: {
    (): void
}
f = a;
a = f;