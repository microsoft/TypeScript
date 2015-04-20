//// [strictModeWordInExportDeclaration.ts]
"use strict"
var x = 1;
export { x as foo }
export { x as implements }
export { x as while }

//// [strictModeWordInExportDeclaration.js]
"use strict";
var x = 1;
export { x as foo };
export { x as implements };
export { x as while };
