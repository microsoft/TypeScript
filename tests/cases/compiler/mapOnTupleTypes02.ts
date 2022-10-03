// @declaration: true
// @noImplicitAny: true
// @strictNullChecks: true

export type Point = [number, number];

export function increment(point: Point) {
  return point.map(d => d + 1);
}