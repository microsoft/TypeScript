//// [controlFlowDestructuringVariablesInTryCatch.ts]
declare function f1(): string;
declare function f2(): [b: string];
declare function f3(): { c: string };

try {
    var a = f1();
    var [b] = f2();
    var { c } = f3();
} catch {
    console.error("error");
}

a;
b;
c;


//// [controlFlowDestructuringVariablesInTryCatch.js]
"use strict";
try {
    var a = f1();
    var b = f2()[0];
    var c = f3().c;
}
catch (_a) {
    console.error("error");
}
a;
b;
c;
