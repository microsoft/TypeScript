//// [tests/cases/compiler/noUncheckedIndexedAccessCompoundAssignments.ts] ////

//// [noUncheckedIndexedAccessCompoundAssignments.ts]
// Each line should have one error
// for a total of 12 errors
stringMap.foo++;
--stringMap.foo;
stringMap.foo += 1;
stringMap.foo *= 1;
++stringMap['foo'];
stringMap['foo']--;
++stringMap[s];
stringMap[s]--;
numberMap[32]++;
numberMap[32] += 1;
numberMap[n]++;
numberMap[n] += 1;

declare const stringMap: { [s: string]: number };
declare const s: string;
declare const numberMap: { [n: number]: number };
declare const n: number;


//// [noUncheckedIndexedAccessCompoundAssignments.js]
"use strict";
// Each line should have one error
// for a total of 12 errors
stringMap.foo++;
--stringMap.foo;
stringMap.foo += 1;
stringMap.foo *= 1;
++stringMap['foo'];
stringMap['foo']--;
++stringMap[s];
stringMap[s]--;
numberMap[32]++;
numberMap[32] += 1;
numberMap[n]++;
numberMap[n] += 1;
