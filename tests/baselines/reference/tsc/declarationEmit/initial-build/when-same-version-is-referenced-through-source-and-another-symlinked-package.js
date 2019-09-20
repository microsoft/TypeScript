//// [/lib/initial-buildOutput.txt]
/lib/tsc -p plugin-one --listFiles
plugin-one/action.ts(4,14): error TS2742: The inferred type of 'actions' cannot be named without a reference to 'plugin-two/node_modules/typescript-fsa'. This is likely not portable. A type annotation is necessary.
/lib/lib.d.ts
/plugin-one/node_modules/typescript-fsa/index.d.ts
/plugin-one/action.ts
/plugin-two/node_modules/typescript-fsa/index.d.ts -> /plugin-one/node_modules/typescript-fsa/index.d.ts
/plugin-two/index.d.ts
/plugin-one/index.ts
exitCode:: 1


//// [/plugin-one/action.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_fsa_1 = require("typescript-fsa"); // Include version of shared lib
var action = typescript_fsa_1.actionCreatorFactory("somekey");
var featureOne = action("feature-one");
exports.actions = { featureOne: featureOne };


//// [/plugin-one/index.d.ts]
export {};


//// [/plugin-one/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


