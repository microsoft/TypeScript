//// [parser_breakTarget5.ts]
target:
while (true) {
  function f() {
    while (true) {
      break target;
    }
  }
}

//// [parser_breakTarget5.js]
target: while (true) {
    function f() {
        while (true) {
            break target;
        }
    }
}
