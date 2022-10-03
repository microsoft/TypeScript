//// [controlFlowDestructuringParameters.ts]
// Repro for #8376


[{ x: 1 }].map(
  ({ x }) => x
);


//// [controlFlowDestructuringParameters.js]
// Repro for #8376
[{ x: 1 }].map(function (_a) {
    var x = _a.x;
    return x;
});
