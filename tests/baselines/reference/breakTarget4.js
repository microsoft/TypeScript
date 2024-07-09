//// [tests/cases/compiler/breakTarget4.ts] ////

//// [breakTarget4.ts]
target1:
target2:
while (true) {
  break target2;
}

//// [breakTarget4.js]
target1: target2: while (true) {
    break target2;
}
