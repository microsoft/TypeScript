// @esModuleInterop: true

// @Filename: /a.ts
class A {}
export type { A }

// @Filename: /b.ts
import * as a from './a';
export = a;

// @Filename: /c.ts
import a = require('./b');
new a.A(); // Error
