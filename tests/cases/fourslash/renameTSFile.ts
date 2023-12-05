/// <reference path='fourslash.ts'/>

// @filename: a.ts
//// import * as foo from './[|b.js|]';

// @filename: b.ts
//// export const b = 1;

goTo.eachRange(range => { verify.renameInfoSucceeded() });