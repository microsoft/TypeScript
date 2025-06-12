//// [tests/cases/compiler/taggedTemplateWithoutDeclaredHelper.ts] ////

//// [foo.ts]
function id<T>(x: T) {
  return x;
}

export const result = id `hello world`;

//// [index.d.ts]
export { };


//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = void 0;
function id(x) {
    return x;
}
exports.result = id `hello world`;
