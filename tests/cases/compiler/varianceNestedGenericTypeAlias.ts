// @strict: true

// Repro from #60453
// Variance measurement fails for type aliases with deeply nested anonymous object types
// containing Arrays, incorrectly computing variance as Independent instead of Covariant.

type TypeA = number;
type TypeB = boolean;

// Two levels of nesting - should be covariant in T
type DataTypeTwo<T extends TypeA | TypeB> = {
  one: Array<{ two: Array<T> }>;
};

// Three levels of nesting - should be covariant in T
type DataTypeThree<T extends TypeA | TypeB> = {
  one: Array<{ two: Array<{ three: Array<T> }> }>;
};

// Inline literal assignments correctly error
let testingThreeErr: DataTypeThree<TypeA> = {
  one: [{ two: [{ three: [true] }] }]  // Error expected
};

let testingTwoErr: DataTypeTwo<TypeA> = {
  one: [{ two: [false] }]  // Error expected
};

// Variable assignments should also error but currently don't due to
// variance being incorrectly computed as Independent
let testingThree: DataTypeThree<TypeA> = {
  one: [{ two: [{ three: [5] }] }]
};

let t3a: DataTypeThree<TypeB> = testingThree;  // Error expected: number not assignable to boolean

let testingTwo: DataTypeTwo<TypeA> = {
  one: [{ two: [5] }]
};

let t2a: DataTypeTwo<TypeB> = testingTwo;  // Error expected: number not assignable to boolean

// Workaround: explicit variance annotation fixes the issue
type DataTypeThreeFixed<out T extends TypeA | TypeB> = {
  one: Array<{ two: Array<{ three: Array<T> }> }>;
};

let testingThreeFixed: DataTypeThreeFixed<TypeA> = {
  one: [{ two: [{ three: [5] }] }]
};

let t3aFixed: DataTypeThreeFixed<TypeB> = testingThreeFixed;  // Error expected and works correctly
