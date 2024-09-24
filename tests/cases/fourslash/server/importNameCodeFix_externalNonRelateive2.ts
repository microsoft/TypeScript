/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/apps/app1/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "paths": {
////       "shared/*": ["../../shared/*"]
////     }
////   },
////   "include": ["src", "../../shared"]
//// }

// @Filename: /home/src/workspaces/project/apps/app1/src/index.ts
//// shared/*internal2external*/

// @Filename: /home/src/workspaces/project/apps/app1/src/app.ts
//// utils/*internal2internal*/

// @Filename: /home/src/workspaces/project/apps/app1/src/utils.ts
//// export const utils = 0;

// @Filename: /home/src/workspaces/project/shared/constants.ts
//// export const shared = 0;

// @Filename: /home/src/workspaces/project/shared/data.ts
//// shared/*external2external*/

format.setOption("newline", "\n");

goTo.marker("internal2external");
verify.importFixAtPosition([`import { shared } from "shared/constants";\n\nshared`], /*errorCode*/ undefined, {
  importModuleSpecifierPreference: "project-relative"
});

goTo.marker("internal2internal");
verify.importFixAtPosition([`import { utils } from "./utils";\n\nutils`], /*errorCode*/ undefined, {
  importModuleSpecifierPreference: "project-relative"
});

goTo.marker("external2external");
verify.importFixAtPosition([`import { shared } from "./constants";\n\nshared`], /*errorCode*/ undefined, {
  importModuleSpecifierPreference: "project-relative"
});
