//// [tests/cases/compiler/continueTarget2.ts] ////

//// [continueTarget2.ts]
target:
while (true) {
  continue target;
}

//// [continueTarget2.js]
target: while (true) {
    continue target;
}
