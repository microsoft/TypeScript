//// [tests/cases/compiler/varianceModifiersOnClassMembers.ts] ////

//// [varianceModifiersOnClassMembers.ts]
// https://github.com/microsoft/typescript-go/issues/4123

class C {
  in x = 1;
  out y = 2;
}

const isIn = "x" in { x: 1 };
for (const k in { x: 1 }) {
  console.log(k);
}


//// [varianceModifiersOnClassMembers.js]
"use strict";
// https://github.com/microsoft/typescript-go/issues/4123
class C {
    x = 1;
    y = 2;
}
const isIn = "x" in { x: 1 };
for (const k in { x: 1 }) {
    console.log(k);
}
