//// [parser_continueTarget5.ts]
target:
while (true) {
  function f() {
    while (true) {
      continue target;
    }
  }
}

//// [parser_continueTarget5.js]
target: while (true) {
    function f() {
        while (true) {
            continue target;
        }
    }
}
