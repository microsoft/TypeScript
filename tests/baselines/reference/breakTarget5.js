//// [tests/cases/compiler/breakTarget5.ts] ////

//// [breakTarget5.ts]
target:
while (true) {
  function f() {
    while (true) {
      break target;
    }
  }
}

//// [breakTarget5.js]
target: while (true) {
    function f() {
        while (true) {
            break target;
        }
    }
}
