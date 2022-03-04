//// [destructuringObjectAssignmentPatternWithNestedSpread.ts]
let a: any, b: any, c: any = {x: {a: 1, y: 2}}, d: any;
({x: {a, ...b} = d} = c);


//// [destructuringObjectAssignmentPatternWithNestedSpread.js]
let a, b, c = { x: { a: 1, y: 2 } }, d;
({ x: { a, ...b } = d } = c);
