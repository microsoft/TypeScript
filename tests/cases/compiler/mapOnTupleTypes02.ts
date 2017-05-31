// @declaration: true
// @noImplicitAny: true
// @strictNullChecks: true
// @lib: es5

export type Point = [number, number];

export function increment(point: Point) {
  return point.map(d => d + 1);
}