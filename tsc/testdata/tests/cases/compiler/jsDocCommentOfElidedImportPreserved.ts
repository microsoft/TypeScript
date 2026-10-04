// @declaration: true

// @filename: index.ts
export interface Foo {}

// @filename: main.ts
/**
 * Some random docs not related to foo
 */
/* trigger */
import * as x from './index.js';
export const foo = 1;

// @filename: detachedCopyright.ts
/**
 * Copyright header
 */

import * as x from './index.js';
export const bar = 2;

// @filename: detachedCopyrightNonJSDoc.ts
/* Non-JSDoc copyright header */

import * as x from './index.js';
export const baz = 3;
