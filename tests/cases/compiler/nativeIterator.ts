// @target: esnext

const iterator = Iterator.from([0, 1, 2]);

const mapped = iterator.map(String);

const filtered = iterator.filter(x => x > 0);

function isZero(x: number): x is 0 {
  return x === 0;
}
const zero = iterator.filter(isZero);

const iteratorFromBare = Iterator.from({
  next() {
    return {
      done: Math.random() < .5,
      value: "a string",
    };
  },
});


function* gen() {
  yield 0;
}

const mappedGen = gen().map(x => x === 0 ? "zero" : "other");

const mappedValues = [0, 1, 2].values().map(x => x === 0 ? "zero" : "other");
