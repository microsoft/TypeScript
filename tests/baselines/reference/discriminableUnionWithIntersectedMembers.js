//// [discriminableUnionWithIntersectedMembers.ts]
// regression test for https://github.com/microsoft/TypeScript/issues/33243
type X = 
 | { x: 'x', y: number } & { y: number } 
 | { x: 'y', y: number, z?: boolean } & { y: number }

// error
const x: X = 4 as any as { x: 'x' | 'y', y: number };

type Y = 
 | { x: 'x', y: number } 
 | { x: 'y', y: number, z?: boolean }

// no  error
const y: Y = 4 as any as { x: 'x' | 'y', y: number };

//// [discriminableUnionWithIntersectedMembers.js]
// error
var x = 4;
// no  error
var y = 4;
