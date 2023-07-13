//// [tests/cases/compiler/badInferenceLowerPriorityThanGoodInference.ts] ////

//// [badInferenceLowerPriorityThanGoodInference.ts]
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


//// [badInferenceLowerPriorityThanGoodInference.js]
// Repro from #13118
var result = canYouInferThis(function () { return ({
    a: { BLAH: 33 },
    b: function (x) { }
}); });
result.BLAH;
// Repro from #26629
function goofus(f) { }
goofus(function (a) { return ({ dog: function () { return a; } }); });
goofus(function (a) { return ({ dog: function () { return a; } }); });
