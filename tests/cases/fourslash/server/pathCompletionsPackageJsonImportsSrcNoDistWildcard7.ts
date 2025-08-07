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
////   "imports": {
////     "#*": "./dist/*.js"
////   }
//// }

// @Filename: /home/src/workspaces/project/src/blah.ts
//// export const blah = 0;

// @Filename: /home/src/workspaces/project/src/index.mts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#blah", kind: "script", kindModifiers: "" },
  ]
});
