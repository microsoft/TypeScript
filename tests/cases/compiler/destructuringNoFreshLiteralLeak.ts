// @strictNullChecks: true
const { x = () => ({a: 12}) } = { x: () => ({a: 24, b: 12}) };
declare function f(x: {a: number}): void;
f(x());
