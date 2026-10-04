// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
// @noEmit: true

declare function f(o: { y?: string }): void;
f({ y: undefined });
