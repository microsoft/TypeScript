/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.base.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "paths": {
////       "pkg-1/*": ["./packages/pkg-1/src/*"],
////       "pkg-2/*": ["./packages/pkg-2/src/*"]
////     }
////   }
//// }

// @Filename: /home/src/workspaces/project/packages/pkg-1/package.json
//// { "dependencies": { "pkg-2": "*" } }

// @Filename: /home/src/workspaces/project/packages/pkg-1/tsconfig.json
//// {
////   "extends": "../../tsconfig.base.json",
////   "references": [
////     { "path": "../pkg-2" }
////   ]
//// }

// @Filename: /home/src/workspaces/project/packages/pkg-1/src/index.ts
//// Pkg2/*external*/

// @Filename: /home/src/workspaces/project/packages/pkg-2/package.json
//// { "types": "dist/index.d.ts" }

// @Filename: /home/src/workspaces/project/packages/pkg-2/tsconfig.json
//// {
////   "extends": "../../tsconfig.base.json",
////   "compilerOptions": { "outDir": "dist", "rootDir": "src", "composite": true }
//// }

// @Filename: /home/src/workspaces/project/packages/pkg-2/src/index.ts
//// import "./utils";

// @Filename: /home/src/workspaces/project/packages/pkg-2/src/utils.ts
//// export const Pkg2 = {};

// @Filename: /home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts
//// Pkg2/*internal*/

// @link: /home/src/workspaces/project/packages/pkg-2 -> /home/src/workspaces/project/packages/pkg-1/node_modules/pkg-2

format.setOption("newline", "\n");

goTo.marker("external");
verify.importFixAtPosition([`import { Pkg2 } from "pkg-2/utils";\n\nPkg2`], /*errorCode*/ undefined, {
  importModuleSpecifierPreference: "project-relative"
});

goTo.marker("internal");
verify.importFixAtPosition([`import { Pkg2 } from "../../utils";\n\nPkg2`], /*errorCode*/ undefined, {
  importModuleSpecifierPreference: "project-relative"
});
