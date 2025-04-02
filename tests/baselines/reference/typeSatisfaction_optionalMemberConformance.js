//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction_optionalMemberConformance.ts] ////

//// [typeSatisfaction_optionalMemberConformance.ts]
type Point2d = { x: number, y: number };
// Undesirable behavior today with type annotation
const a = { x: 10 } satisfies Partial<Point2d>;
// Should OK
console.log(a.x.toFixed());
// Should error
let p = a.y;


//// [typeSatisfaction_optionalMemberConformance.js]
// Undesirable behavior today with type annotation
var a = { x: 10 };
// Should OK
console.log(a.x.toFixed());
// Should error
var p = a.y;
