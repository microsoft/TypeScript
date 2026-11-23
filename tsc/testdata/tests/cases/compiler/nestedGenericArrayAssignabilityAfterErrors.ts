// @strict: true
// @noEmit: true
// @target: esnext

// Assigning DataTypeThree<number> to DataTypeThree<boolean>, and likewise for
// DataTypeTwo, must be reported whether or not earlier assignments errored.

type TypeA = number;
type TypeB = boolean;
type DataTypeTwo<T extends TypeA | TypeB> = {
  one: Array<{ two: Array<T> }>;
};
type DataTypeThree<T extends TypeA | TypeB> = {
  one: Array<{ two: Array<{ three: Array<T> }> }>;
};

let testingThreeErr: DataTypeThree<TypeA> = {
  one: [{ two: [{ three: [true] }] }]
};
let testingTwoErr: DataTypeTwo<TypeA> = {
  one: [{ two: [false] }]
};

let testingThree: DataTypeThree<TypeA> = {
  one: [{ two: [{ three: [5] }] }]
};
let t3a: DataTypeThree<TypeB> = testingThree;

let testingTwo: DataTypeTwo<TypeA> = {
  one: [{ two: [5] }]
};
let t2a: DataTypeTwo<TypeB> = testingTwo;
