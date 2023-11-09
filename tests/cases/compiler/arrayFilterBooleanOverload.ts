// @strict: true
// @declaration: true
// @target: es6

const nullableValues = ['a', 'b', null]; // expect (string | null)[]

const values1 = nullableValues.filter(Boolean); // expect string[]

// @ts-expect-error
const values2 = nullableValues.filter(new Boolean);

const arr = [0, 1, "", "foo", null] as const;

const arr2 = arr.filter(Boolean); // expect ("foo" | 1)[]

