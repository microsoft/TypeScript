/// <reference path="fourslash.ts" />

// @Filename: /packages/test-package-1/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "paths": {
////       "test-package-2/*": ["../test-package-2/src/*"]
////     }
////   }
//// }

// @Filename: /packages/test-package-1/src/common/logging.ts
//// export class Logger {};

// @Filename: /packages/test-package-1/src/something/index.ts
//// Logger/**/


goTo.marker("");
verify.importFixAtPosition([`import { Logger } from "../common/logging";\n\nLogger`]);
