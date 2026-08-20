// @target: es2015
// Repro for #8376

// @strictNullChecks: true

[{ x: 1 }].map(
  ({ x }) => x
);
