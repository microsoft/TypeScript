//// [tests/cases/compiler/duplicateLabel2.ts] ////

//// [duplicateLabel2.ts]
target:
while (true) {
  target:
  while (true) {
  }
}

//// [duplicateLabel2.js]
target: while (true) {
    target: while (true) {
    }
}
