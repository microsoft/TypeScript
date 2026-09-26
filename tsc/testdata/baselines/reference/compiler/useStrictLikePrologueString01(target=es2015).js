//// [tests/cases/compiler/useStrictLikePrologueString01.ts] ////

//// [useStrictLikePrologueString01.ts]
"hey!"
" use strict "
export function f() {   
}

//// [useStrictLikePrologueString01.js]
"use strict";
"hey!";
" use strict ";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() {
}
