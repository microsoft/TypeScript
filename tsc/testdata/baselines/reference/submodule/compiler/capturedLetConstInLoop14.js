//// [tests/cases/compiler/capturedLetConstInLoop14.ts] ////

//// [capturedLetConstInLoop14.ts]
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


//// [capturedLetConstInLoop14.js]
function use(v) { }
function foo(x) {
    var v = 1;
    do {
        let x = v;
        var v;
        var v = 2;
        () => x + v;
    } while (false);
    use(v);
}
