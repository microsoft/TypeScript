/// <reference path="../fourslash.ts"/>

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "rootDir": "src",
////     "outDir": "dist",
////     "declarationDir": "types"
////   }
//// }

// @Filename: /home/src/workspaces/project/package.json
//// {
////   "types": "index.d.ts",
////   "imports": {
////     "#component-*": {
////       "types@>=4.3.5": "types/components/*.d.ts"
////     }
////   }
//// }

// @Filename: /home/src/workspaces/project/nope.ts
//// export const nope = 0;

// @Filename: /home/src/workspaces/project/src/components/index.ts
//// export const index = 0;

// @Filename: /home/src/workspaces/project/src/components/blah.ts
//// export const blah = 0;

// @Filename: /home/src/workspaces/project/src/components/subfolder/one.ts
//// export const one = 0;

// @Filename: /home/src/workspaces/project/src/a.ts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#component-blah", kind: "script" },
    { name: "#component-index", kind: "script" },
    { name: "#component-subfolder", kind: "directory" },
  ],
});

edit.insert("#component-subfolder/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [{ name: "one", kind: "script" }],
});
