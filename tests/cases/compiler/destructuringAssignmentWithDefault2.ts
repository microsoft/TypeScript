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


declare const r: Iterator<number>;
let done: boolean;
let value;

({ done = false, value } = r.next());
({ done: done = false, value } = r.next());