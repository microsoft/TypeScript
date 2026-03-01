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
"use strict";
function use(v) { }
function foo(x) {
    var v = 1;
    var _loop_1 = function () {
        var x_1 = v;
        v = 2;
        (function () { return x_1 + v; });
    };
    var v, v;
    do {
        _loop_1();
    } while (false);
    use(v);
}
