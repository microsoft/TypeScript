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
////   "types": "index.d.ts",
////   "imports": {
////     "#*": "dist/*",
////     "#foo/*": "dist/*",
////     "#bar/*": "dist/*",
////     "#exact-match": "dist/index.d.ts"
////   }
//// }

// @Filename: /home/src/workspaces/project/nope.ts
//// export const nope = 0;

// @Filename: /home/src/workspaces/project/src/index.ts
//// export const index = 0;

// @Filename: /home/src/workspaces/project/src/blah.ts
//// export const blah = 0;

// @Filename: /home/src/workspaces/project/src/foo/onlyInFooFolder.ts
//// export const foo = 0;

// @Filename: /home/src/workspaces/project/src/subfolder/one.ts
//// export const one = 0;

// @Filename: /home/src/workspaces/project/src/a.mts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#a.mjs", kind: "script", kindModifiers: ".mjs" },
    { name: "#blah.js", kind: "script", kindModifiers: ".js" },
    { name: "#index.js", kind: "script", kindModifiers: ".js" },
    { name: "#foo", kind: "directory" },
    { name: "#subfolder", kind: "directory" },
    { name: "#bar", kind: "directory" },
    { name: "#exact-match", kind: "script" },
  ],
});

edit.insert("#foo/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [
    { name: "a.mjs", kind: "script", kindModifiers: ".mjs" },
    { name: "blah.js", kind: "script", kindModifiers: ".js" },
    { name: "index.js", kind: "script", kindModifiers: ".js" },
    { name: "foo", kind: "directory" },
    { name: "subfolder", kind: "directory" },
  ],
});

edit.insert("foo/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [{ name: "onlyInFooFolder.js", kind: "script", kindModifiers: ".js" }],
});
