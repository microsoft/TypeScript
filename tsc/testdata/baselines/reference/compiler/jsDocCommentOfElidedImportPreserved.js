//// [tests/cases/compiler/jsDocCommentOfElidedImportPreserved.ts] ////

//// [index.ts]
export interface Foo {}

//// [main.ts]
/**
 * Some random docs not related to foo
 */
/* trigger */
import * as x from './index.js';
export const foo = 1;

//// [detachedCopyright.ts]
/**
 * Copyright header
 */

import * as x from './index.js';
export const bar = 2;

//// [detachedCopyrightNonJSDoc.ts]
/* Non-JSDoc copyright header */

import * as x from './index.js';
export const baz = 3;


//// [index.js]
export {};
//// [main.js]
export const foo = 1;
//// [detachedCopyright.js]
/**
 * Copyright header
 */
export const bar = 2;
//// [detachedCopyrightNonJSDoc.js]
/* Non-JSDoc copyright header */
export const baz = 3;


//// [index.d.ts]
export interface Foo {
}
//// [main.d.ts]
export declare const foo = 1;
//// [detachedCopyright.d.ts]
/**
 * Copyright header
 */
export declare const bar = 2;
//// [detachedCopyrightNonJSDoc.d.ts]
export declare const baz = 3;
