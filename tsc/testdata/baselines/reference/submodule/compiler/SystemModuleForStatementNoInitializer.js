//// [tests/cases/compiler/SystemModuleForStatementNoInitializer.ts] ////

//// [SystemModuleForStatementNoInitializer.ts]
export { };

let i = 0;
let limit = 10;

for (; i < limit; ++i) {
    break;
}

for (; ; ++i) {
    break;
}

for (; ;) {
    break;
}


//// [SystemModuleForStatementNoInitializer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i = 0;
let limit = 10;
for (; i < limit; ++i) {
    break;
}
for (;; ++i) {
    break;
}
for (;;) {
    break;
}
