// @strict: true
// @target: es5
// @noTypesAndSymbols: true

function use(v: number) {}

function foo(x: number) {
  var v = 1;
  do {
    let x = v;
    var v;
    var v = 2;
    () => x + v;
  } while (false);

  use(v);
}
