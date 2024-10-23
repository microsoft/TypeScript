/// <reference path="../fourslash.ts"/>

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "rootDir": "src",
////     "outDir": "dist"
////   }
//// }

// @Filename: /home/src/workspaces/project/package.json
//// {
////   "name": "foo",
////   "main": "dist/index.js",
////   "module": "dist/index.mjs",
////   "types": "dist/index.d.ts",
////   "imports": {
////     "#*": "./dist/*?.d.ts"
////   }
//// }

// @Filename: /home/src/workspaces/project/src/index.ts
//// export const index = 0;

// @Filename: /home/src/workspaces/project/src/blah?.ts
//// export const blah = 0;

// @Filename: /home/src/workspaces/project/src/m.mts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#blah", kind: "script", kindModifiers: "" },
  ]
});
