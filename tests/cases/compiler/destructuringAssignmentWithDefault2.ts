// @lib: es2015
// @strictNullChecks: true
const a: { x?: number; y?: number } = { };

let x: number;

// Should not error out
({ x = 0 } = a);
({ x: x = 0} = a);
({ y: x = 0} = a);

// Should be error
({ x = undefined } = a);
({ x: x = undefined } = a);
({ y: x = undefined } = a);

const { x: z1 } = a;
const { x: z2 = 0 } = a;
const { x: z3 = undefined } = a;


declare const r: Iterator<number>;
let done: boolean;
let value;

({ done = false, value } = r.next());
({ done: done = false, value } = r.next());