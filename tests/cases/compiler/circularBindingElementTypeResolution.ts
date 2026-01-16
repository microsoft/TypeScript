// @strict: true
// @noEmit: true

// Test case 1: Simple self-reference with shorthand property
const { c, f }: string | number = { c: 0, f };

// Test case 2: Self-reference with expression
const { a, f2 }: string | number = { a: 0, f2: (1 + f2) };

// Test case 3: Circular reference between two binding elements
const { a2, f3 }: string | number = { a2: f3, f3: a2 };

// Test case 4: Nested destructuring with self-reference
const { nested: { x, y } }: { nested: { x: number, y: string } } = { nested: { x: y, y: x } };
