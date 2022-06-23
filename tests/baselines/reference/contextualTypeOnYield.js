//// [contextualTypeOnYield.ts]
type FuncOrGeneratorFunc = () => (number | Generator<(arg: number) => void, any, void>)

const f: FuncOrGeneratorFunc = function*() {
  yield (num) => console.log(num); // `num` should be inferred to have type `number`.
}

//// [contextualTypeOnYield.js]
"use strict";
const f = function* () {
    yield (num) => console.log(num); // `num` should be inferred to have type `number`.
};
