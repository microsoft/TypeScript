//// [tests/cases/compiler/exportDefaultInvalidModifiers.ts] ////

//// [exportDefaultDeclareAbstractFunction.ts]
export default declare abstract function(a: number): void

//// [exportDefaultDeclaresyncFunction.ts]
export default declare async function(a: number): void

//// [exportDefaultDeclareStaticFunction.ts]
export default declare static function(a: number): void

//// [exportDefaultStaticFunction.ts]
export default static function(a: number): void

//// [exportDefaultAbstractConstEnum.ts]
export default abstract const enum A {}



//// [exportDefaultDeclareAbstractFunction.js]
"use strict";
exports.__esModule = true;
//// [exportDefaultDeclaresyncFunction.js]
"use strict";
exports.__esModule = true;
//// [exportDefaultDeclareStaticFunction.js]
"use strict";
exports.__esModule = true;
//// [exportDefaultStaticFunction.js]
"use strict";
exports.__esModule = true;
exports["default"] = static;
//// [exportDefaultAbstractConstEnum.js]
"use strict";
exports.__esModule = true;
