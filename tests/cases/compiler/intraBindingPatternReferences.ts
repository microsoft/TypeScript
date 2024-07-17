// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59177

function foo() { return a }

const [a, b = a + 1] = [42];

const [c1, c2 = c1] = [123];
const [d1, d2 = d1, d3 = d2] = [123];

const { e1, e2 = e1 } = { e1: 1 };
const { f1, f2 = f1, f3 = f2 } = { f1: 1 };

// Example that requires padding of object literal types at depth
const mockCallback = ({ event: { params = {} } = {} }) => {};

// The contextual type for the second lambda in the object literal is 'any' because of the
// intra-binding-pattern reference in the initializer for fn2
const { fn1 = (x: number) => 0, fn2 = fn1 } = { fn1: x => x + 1, fn2: x => x + 2 };
