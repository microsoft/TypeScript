//// [duplicateLabel3.ts]
target:
while (true) {
  function f() {
    target:
    while (true) {
    }
  }
}

//// [duplicateLabel3.js]
target: while (true) {
    function f() {
        target: while (true) {
        }
    }
}
