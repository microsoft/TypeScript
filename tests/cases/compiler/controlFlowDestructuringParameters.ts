// Repro for #8376

// @strictNullChecks: true
// @lib: es5

[{ x: 1 }].map(
  ({ x }) => x
);
