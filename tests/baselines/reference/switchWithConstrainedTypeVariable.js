//// [tests/cases/conformance/controlFlow/switchWithConstrainedTypeVariable.ts] ////

//// [switchWithConstrainedTypeVariable.ts]
// Repro from #20840

function function1<T extends 'a' | 'b'>(key: T) {
  switch (key) {
    case 'a':
      key.toLowerCase();
      break;
    default:
      key.toLowerCase();
      break;
  }
}


//// [switchWithConstrainedTypeVariable.js]
"use strict";
// Repro from #20840
function function1(key) {
    switch (key) {
        case 'a':
            key.toLowerCase();
            break;
        default:
            key.toLowerCase();
            break;
    }
}
