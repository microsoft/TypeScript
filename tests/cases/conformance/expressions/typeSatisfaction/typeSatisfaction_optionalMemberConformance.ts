type Point2d = { x: number, y: number };
// Undesirable behavior today with type annotation
const a = { x: 10 } satisfies Partial<Point2d>;
// Should OK
console.log(a.x.toFixed());
// Should error
let p = a.y;
