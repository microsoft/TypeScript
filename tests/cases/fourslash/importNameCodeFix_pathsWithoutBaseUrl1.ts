/// <reference path="fourslash.ts" />

// @Filename: tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "paths": {
////       "@app/*": ["./lib/*"]
////     }
////   }
//// }

// @Filename: index.ts
//// utils/**/

// @Filename: lib/utils.ts
//// export const utils = {};


goTo.marker("");
verify.importFixAtPosition([`import { utils } from "@app/utils";\n\nutils`]);
