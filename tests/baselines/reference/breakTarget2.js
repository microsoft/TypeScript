//// [tests/cases/compiler/breakTarget2.ts] ////

//// [breakTarget2.ts]
target:
while (true) {
  break target;
}

//// [breakTarget2.js]
target: while (true) {
    break target;
}
