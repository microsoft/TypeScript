// @esModuleInterop: true

// @Filename: /a.ts
export class A {}

// @Filename: /b.ts
import type * as types from './a';
export = types; // Error

// @Filename: /c.ts
import * as types from './a';
export = types;

// @Filename: /d.ts
import types from './b';
new types.A(); // Error

// @Filename: /e.ts
import types = require('./b');
new types.A(); // Error

// @Filename: /f.ts
import * as types from './b';
new types.A(); // Error

// @Filename: /g.ts
import type types from './c'
new types.A(); // Error
