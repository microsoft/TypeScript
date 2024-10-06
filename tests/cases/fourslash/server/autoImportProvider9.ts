/// <reference path="../fourslash.ts" />

// @module: preserve

// @Filename: /home/src/workspaces/project/index.ts
//// Lib1/**/

// @Filename: /home/src/workspaces/project/package.json
//// {
////   "dependencies": {
////     "lib1": "*",
////     "lib2": "*",
////     "lib3": "*",
////     "lib4": "*",
////     "lib5": "*",
////     "lib6": "*",
////     "lib7": "*",
////     "lib8": "*",
////     "lib9": "*",
////     "lib10": "*",
////     "lib11": "*"
////   }
//// }

// @Filename: /home/src/workspaces/project/node_modules/lib1/package.json
//// { "name": "lib1", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib1/index.d.ts
//// export class Lib1 {}

// @Filename: /home/src/workspaces/project/node_modules/lib2/package.json
//// { "name": "lib2", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib2/index.d.ts
//// export class Lib2 {}

// @Filename: /home/src/workspaces/project/node_modules/lib3/package.json
//// { "name": "lib3", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib3/index.d.ts
//// export class Lib3 {}

// @Filename: /home/src/workspaces/project/node_modules/lib4/package.json
//// { "name": "lib4", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib4/index.d.ts
//// export class Lib4 {}

// @Filename: /home/src/workspaces/project/node_modules/lib5/package.json
//// { "name": "lib5", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib5/index.d.ts
//// export class Lib5 {}

// @Filename: /home/src/workspaces/project/node_modules/lib6/package.json
//// { "name": "lib6", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib6/index.d.ts
//// export class Lib6 {}

// @Filename: /home/src/workspaces/project/node_modules/lib7/package.json
//// { "name": "lib7", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib7/index.d.ts
//// export class Lib7 {}

// @Filename: /home/src/workspaces/project/node_modules/lib8/package.json
//// { "name": "lib8", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib8/index.d.ts
//// export class Lib8 {}

// @Filename: /home/src/workspaces/project/node_modules/lib9/package.json
//// { "name": "lib9", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib9/index.d.ts
//// export class Lib9 {}

// @Filename: /home/src/workspaces/project/node_modules/lib10/package.json
//// { "name": "lib10", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib10/index.d.ts
//// export class Lib10 {}

// @Filename: /home/src/workspaces/project/node_modules/lib11/package.json
//// { "name": "lib11", "types": "./index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/lib11/index.d.ts
//// export class Lib11 {}

verify.importFixModuleSpecifiers("", []);
verify.importFixModuleSpecifiers("", []);

edit.insertLine("import {} from 'lib2';");
verify.importFixModuleSpecifiers("", ["lib1"]);
