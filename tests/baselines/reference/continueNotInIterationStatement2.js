//// [tests/cases/compiler/continueNotInIterationStatement2.ts] ////

//// [continueNotInIterationStatement2.ts]
while (true) {
  function f() {
    continue;
  }
}

//// [continueNotInIterationStatement2.js]
while (true) {
    function f() {
        continue;
    }
}
