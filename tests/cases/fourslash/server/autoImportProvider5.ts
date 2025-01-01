/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "react-hook-form": "*" } }

// @Filename: /home/src/workspaces/project/node_modules/react-hook-form/package.json
//// { "types": "dist/index.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/react-hook-form/dist/index.d.ts
//// export * from "./useForm";

// @Filename: /home/src/workspaces/project/node_modules/react-hook-form/dist/useForm.d.ts
//// export declare function useForm(): void;

// @Filename: /home/src/workspaces/project/index.ts
//// useForm/**/

goTo.marker("");
verify.importFixAtPosition([
  `import { useForm } from "react-hook-form";\r\n\r\nuseForm`,
  `import { useForm } from "react-hook-form/dist/useForm";\r\n\r\nuseForm`
]);
