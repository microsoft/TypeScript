/// <reference path="../fourslash.ts" />

// @Filename: /project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts
//// export declare function Component(): void;

// @Filename: /project/index.ts
//// Component/**/

// @link: /project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react -> /project/node_modules/@types/react

goTo.marker("");
verify.importFixAtPosition([`import { Component } from "react";\r\n\r\nComponent`]);
