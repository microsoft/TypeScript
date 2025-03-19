//// [tests/cases/compiler/arrayFrom.ts] ////

//// [arrayFrom.ts]
// Tests fix for #20432, ensures Array.from accepts all valid inputs
// Also tests for #19682

interface A {
  a: string;
}

interface B {
  b: string;
}

const inputA: A[] = [];
const inputB: B[] = [];
const inputALike: ArrayLike<A> = { length: 0 };
const inputARand = getEither(inputA, inputALike);
const inputASet = new Set<A>();

const result1: A[] = Array.from(inputA);
const result2: A[] = Array.from(inputA.values());
const result3: B[] = Array.from(inputA.values()); // expect error
const result4: A[] = Array.from(inputB, ({ b }): A => ({ a: b }));
const result5: A[] = Array.from(inputALike);
const result6: B[] = Array.from(inputALike); // expect error
const result7: B[] = Array.from(inputALike, ({ a }): B => ({ b: a }));
const result8: A[] = Array.from(inputARand);
const result9: B[] = Array.from(inputARand, ({ a }): B => ({ b: a }));
const result10: A[] = Array.from(new Set<A>());
const result11: B[] = Array.from(inputASet, ({ a }): B => ({ b: a }));

// if this is written inline, the compiler seems to infer
// the ?: as always taking the false branch, narrowing to ArrayLike<T>,
// even when the type is written as : Iterable<T>|ArrayLike<T>
function getEither<T> (in1: Iterable<T>, in2: ArrayLike<T>) {
  return Math.random() > 0.5 ? in1 : in2;
}


//// [arrayFrom.js]
const inputA = [];
const inputB = [];
const inputALike = { length: 0 };
const inputARand = getEither(inputA, inputALike);
const inputASet = new Set();
const result1 = Array.from(inputA);
const result2 = Array.from(inputA.values());
const result3 = Array.from(inputA.values()); // expect error
const result4 = Array.from(inputB, ({ b }) => ({ a: b }));
const result5 = Array.from(inputALike);
const result6 = Array.from(inputALike); // expect error
const result7 = Array.from(inputALike, ({ a }) => ({ b: a }));
const result8 = Array.from(inputARand);
const result9 = Array.from(inputARand, ({ a }) => ({ b: a }));
const result10 = Array.from(new Set());
const result11 = Array.from(inputASet, ({ a }) => ({ b: a }));
// if this is written inline, the compiler seems to infer
// the ?: as always taking the false branch, narrowing to ArrayLike<T>,
// even when the type is written as : Iterable<T>|ArrayLike<T>
function getEither(in1, in2) {
    return Math.random() > 0.5 ? in1 : in2;
}
