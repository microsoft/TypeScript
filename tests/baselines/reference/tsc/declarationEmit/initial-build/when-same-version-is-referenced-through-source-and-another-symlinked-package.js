//// [/lib/initial-buildOutput.txt]
/lib/tsc -p plugin-one --listFiles
/lib/lib.d.ts
/plugin-one/node_modules/typescript-fsa/index.d.ts
/plugin-one/action.ts
/plugin-two/node_modules/typescript-fsa/index.d.ts -> /plugin-one/node_modules/typescript-fsa/index.d.ts
/plugin-two/index.d.ts
/plugin-one/index.ts
exitCode:: 0


//// [/plugin-one/action.d.ts]
export declare const actions: {
    featureOne: import("typescript-fsa").ActionCreator<{
        route: string;
    }>;
};


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


