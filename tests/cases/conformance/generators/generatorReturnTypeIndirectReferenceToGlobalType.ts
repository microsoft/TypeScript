// @strict: true
// @target: esnext

interface I1 extends Iterator<0, 1, 2> {}

function* f1(): I1 {
  const a = yield 0;
  return 1;
}
