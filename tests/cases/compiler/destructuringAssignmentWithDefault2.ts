// @strictNullChecks: true
const a: { x?: number; y?: number } = { };

let x: number;

({ x = 0 } = a);
({ x: x = 0} = a);
({ y: x = 0} = a);

