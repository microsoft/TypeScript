// @target: es2022
// @lib: esnext,dom
// @noEmitHelpers: true

using z = { [Symbol.dispose]() {} };
var [...[a, b]] = [0, 1];
var [...{ length: c }] = [0, 1];
var [...[d = 2, , ...[e]]] = [undefined, 1, 3];
