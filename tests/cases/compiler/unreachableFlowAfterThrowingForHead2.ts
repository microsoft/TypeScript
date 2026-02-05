// @strict: true
// @noEmit: true
// @allowUnreachableCode: true, false

function test1(v: 0 | 1 | 2) {
  try {
    for (
      (function () {
        throw new Error("");
      })();
      v;
      v++
    ) {}
  } catch (e) {}
  v;
}
