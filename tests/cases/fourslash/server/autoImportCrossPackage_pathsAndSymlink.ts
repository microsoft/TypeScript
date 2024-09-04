/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/packages/common/package.json
//// {
////   "name": "@company/common",
////   "version": "1.0.0",
////   "main": "./lib/index.tsx"
//// }

// @Filename: /home/src/workspaces/project/packages/common/lib/index.tsx
//// export function Tooltip {};

// @Filename: /home/src/workspaces/project/packages/app/package.json
//// {
////   "name": "@company/app",
////   "version": "1.0.0",
////   "dependencies": {
////     "@company/common": "1.0.0"
////   }
//// }

// @Filename: /home/src/workspaces/project/packages/app/tsconfig.json
//// {
////   "compilerOptions": {
////     "composite": true,
////     "module": "esnext",
////     "moduleResolution": "bundler",
////     "paths": {
////       "@/*": ["./*"]
////     }
////   }
//// }

// @Filename: /home/src/workspaces/project/packages/app/lib/index.ts
//// Tooltip/**/

// @link: /home/src/workspaces/project/packages/common -> /home/src/workspaces/project/node_modules/@company/common

goTo.marker("");
verify.importFixModuleSpecifiers("", ["@company/common"]);
