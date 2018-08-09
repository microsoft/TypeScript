//// [badInferenceLowerPriorityThanGoodInference.ts]
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

//// [badInferenceLowerPriorityThanGoodInference.js]
var result = canYouInferThis(function () { return ({
    a: { BLAH: 33 },
    b: function (x) { }
}); });
result.BLAH;
