//// [tests/cases/compiler/builtinIterator.ts] ////

//// [builtinIterator.ts]
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


class GoodIterator extends Iterator<number> {
  next() {
    return { done: false, value: 0 } as const;
  }
}

// error cases
new Iterator<number>();

class C extends Iterator<number> {}

// it's unfortunate that these are an error
class BadIterator1 extends Iterator<number> {
  next() {
    if (Math.random() < .5) {
      return { done: false, value: 0 } as const;
    } else {
      return { done: true, value: "a string" } as const;
    }
  }
}

class BadIterator2 extends Iterator<number> {
  next() {
    return { done: false, value: 0 };
  }
}

class BadIterator3 extends Iterator<number> {
  next() {
    if (Math.random() < .5) {
      return { done: false, value: 0 };
    } else {
      return { done: true, value: "a string" };
    }
  }
}

declare const g1: Generator<string, number, boolean>;
const iter1 = Iterator.from(g1);

declare const iter2: IteratorObject<string>;
const iter3 = iter2.flatMap(() => g1);

//// [builtinIterator.js]
"use strict";
const iterator = Iterator.from([0, 1, 2]);
const mapped = iterator.map(String);
const filtered = iterator.filter(x => x > 0);
function isZero(x) {
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
class GoodIterator extends Iterator {
    next() {
        return { done: false, value: 0 };
    }
}
// error cases
new Iterator();
class C extends Iterator {
}
// it's unfortunate that these are an error
class BadIterator1 extends Iterator {
    next() {
        if (Math.random() < .5) {
            return { done: false, value: 0 };
        }
        else {
            return { done: true, value: "a string" };
        }
    }
}
class BadIterator2 extends Iterator {
    next() {
        return { done: false, value: 0 };
    }
}
class BadIterator3 extends Iterator {
    next() {
        if (Math.random() < .5) {
            return { done: false, value: 0 };
        }
        else {
            return { done: true, value: "a string" };
        }
    }
}
const iter1 = Iterator.from(g1);
const iter3 = iter2.flatMap(() => g1);
