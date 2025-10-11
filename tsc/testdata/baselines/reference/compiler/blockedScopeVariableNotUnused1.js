//// [tests/cases/compiler/blockedScopeVariableNotUnused1.ts] ////

//// [blockedScopeVariableNotUnused1.ts]
export function foo() {
  const _fn = () => {
    ;(() => numFilesSelected)()
  }

  const numFilesSelected = 1
}


//// [blockedScopeVariableNotUnused1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    const _fn = () => {
        ;
        (() => numFilesSelected)();
    };
    const numFilesSelected = 1;
}
