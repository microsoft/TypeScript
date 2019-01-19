// Repro from #13118

interface Foo<A> {
    a: A;
    b: (x: A) => void;
}

declare function canYouInferThis<A>(fn: () => Foo<A>): A;

const result = canYouInferThis(() => ({
    a: { BLAH: 33 },
    b: x => { }
}))

result.BLAH;

// Repro from #26629

function goofus <ARGS extends any[]> (f: (...args: ARGS) => any ) {}

goofus((a: string) => ({ dog() { return a; } }));
goofus((a: string) => ({ dog: function() { return a; } }));
