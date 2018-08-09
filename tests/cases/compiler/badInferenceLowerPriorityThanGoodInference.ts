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