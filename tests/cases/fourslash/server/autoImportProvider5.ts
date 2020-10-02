/// <reference path="../fourslash.ts" />

// @Filename: /package.json
//// { "dependencies": { "react-hook-form": "*" } }

// @Filename: /node_modules/react-hook-form/package.json
//// { "types": "dist/index.d.ts" }

// @Filename: /node_modules/react-hook-form/dist/index.d.ts
//// export * from "./useForm";

// @Filename: /node_modules/react-hook-form/dist/useForm.d.ts
//// export declare function useForm(): void;

// @Filename: /index.ts
//// useForm/**/

goTo.marker("");
verify.importFixAtPosition([
  `import { useForm } from "react-hook-form";\r\n\r\nuseForm`,
  `import { useForm } from "react-hook-form/dist/useForm";\r\n\r\nuseForm`
]);
