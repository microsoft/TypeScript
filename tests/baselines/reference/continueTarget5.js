//// [tests/cases/compiler/continueTarget5.ts] ////

//// [continueTarget5.ts]
target:
while (true) {
  function f() {
    while (true) {
      continue target;
    }
  }
}

//// [continueTarget5.js]
target: while (true) {
    function f() {
        while (true) {
            continue target;
        }
    }
}
