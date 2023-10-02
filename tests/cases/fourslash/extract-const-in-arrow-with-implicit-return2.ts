/// <reference path='fourslash.ts' />

////export interface Point {
////  x: number;
////  y: number;
////}
////
////export function double(points: Point[]) {
////  return points.map(p => ({ x: /*1*/p.x * 2/*2*/, y: p.y * 2}));
////}

goTo.select("1", "2");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`export interface Point {
  x: number;
  y: number;
}

export function double(points: Point[]) {
  return points.map(p => {
      const newLocal = p.x * 2;
      return ({ x: /*RENAME*/newLocal, y: p.y * 2 });
  });
}`
});
