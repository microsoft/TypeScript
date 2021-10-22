// @lib: es2015
// @strictNullChecks: true
const a: { x?: number; y?: number } = { };

let x: number;

({ x = 0 } = a);
({ x: x = 0} = a);
({ y: x = 0} = a);


declare const r: Iterator<number>;
let done: boolean;
let value;

({ done = false, value } = r.next());
({ done: done = false, value } = r.next());