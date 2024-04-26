// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: ./a.js
export const foo = 1;

// @filename: ./b.js
'use strict';

/** @private */

import { foo } from './a.js';

console.log(foo);
