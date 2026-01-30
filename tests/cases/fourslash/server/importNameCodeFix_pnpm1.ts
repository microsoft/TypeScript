/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
<<<<<<< HEAD
//// { "compilerOptions": { "module": "commonjs", "types": ["*"] } }
=======
//// { "compilerOptions": { "module": "commonjs", "lib": ["es5"] } }
>>>>>>> upstream/main

// @Filename: /home/src/workspaces/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts
//// export declare function Component(): void;

// @Filename: /home/src/workspaces/project/index.ts
//// Component/**/

// @link: /home/src/workspaces/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react -> /home/src/workspaces/project/node_modules/@types/react

goTo.marker("");
verify.importFixAtPosition([`import { Component } from "react";\r\n\r\nComponent`]);
