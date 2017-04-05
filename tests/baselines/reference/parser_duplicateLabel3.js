//// [parser_duplicateLabel3.ts]
target:
while (true) {
  function f() {
    target:
    while (true) {
    }
  }
}

//// [parser_duplicateLabel3.js]
target: while (true) {
    function f() {
        target: while (true) {
        }
    }
}
