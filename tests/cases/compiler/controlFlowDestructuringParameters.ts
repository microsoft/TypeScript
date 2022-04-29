// Repro for #8376

// @strictNullChecks: true

[{ x: 1 }].map(
  ({ x }) => x
);
