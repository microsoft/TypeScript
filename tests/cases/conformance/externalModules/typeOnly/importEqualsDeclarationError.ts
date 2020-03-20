// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: /a.ts
type T = {};
export = T;

// @Filename: /b.ts
class SomeClass {}
export = SomeClass;

// @Filename: /c.ts
import type T = require('./a'); // Error
import type = require('./b');   // Ok
