//// [/lib/initial-buildOutput.txt]
/lib/tsc -p src/plugin-one --listFiles
/lib/lib.d.ts
/src/plugin-one/node_modules/typescript-fsa/index.d.ts
/src/plugin-one/action.ts
/src/plugin-one/node_modules/plugin-two/node_modules/typescript-fsa/index.d.ts
/src/plugin-one/node_modules/plugin-two/index.d.ts
/src/plugin-one/index.ts
exitCode:: ExitStatus.Success


//// [/src/plugin-one/action.d.ts]
export declare const actions: {
    featureOne: import("typescript-fsa").ActionCreator<{
        route: string;
    }>;
};


//// [/src/plugin-one/action.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_fsa_1 = require("typescript-fsa"); // Include version of shared lib
var action = typescript_fsa_1.actionCreatorFactory("somekey");
var featureOne = action("feature-one");
exports.actions = { featureOne: featureOne };


//// [/src/plugin-one/index.d.ts]
export {};


//// [/src/plugin-one/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


