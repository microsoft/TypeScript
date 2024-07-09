//// [tests/cases/compiler/exportDefaultAlias_excludesEverything.ts] ////

//// [exportDefaultAlias_excludesEverything.ts]
export default interface A {}
interface B {}
export default B;


//// [exportDefaultAlias_excludesEverything.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
