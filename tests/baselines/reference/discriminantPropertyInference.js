//// [discriminantPropertyInference.ts]
// Repro from #41759

type DiscriminatorTrue = {
    disc: true;
    cb: (x: string) => void;
}

type DiscriminatorFalse = {
    disc?: false;
    cb: (x: number) => void;
}

type Props = DiscriminatorTrue | DiscriminatorFalse;

declare function f(options: DiscriminatorTrue | DiscriminatorFalse): any;

// simple inference
f({
    disc: true,
    cb: s => parseInt(s)
});

// simple inference
f({
    disc: false,
    cb: n => n.toFixed()
});

// simple inference when strict-null-checks are enabled
f({
    disc: undefined,
    cb: n => n.toFixed()
});

// requires checking type information since discriminator is missing from object
f({
    cb: n => n.toFixed()
});


//// [discriminantPropertyInference.js]
// Repro from #41759
// simple inference
f({
    disc: true,
    cb: function (s) { return parseInt(s); }
});
// simple inference
f({
    disc: false,
    cb: function (n) { return n.toFixed(); }
});
// simple inference when strict-null-checks are enabled
f({
    disc: undefined,
    cb: function (n) { return n.toFixed(); }
});
// requires checking type information since discriminator is missing from object
f({
    cb: function (n) { return n.toFixed(); }
});
