/// <reference path="../fourslash.ts" />

// @Filename: /project/packages/common/package.json
//// {
////   "name": "@company/common",
////   "version": "1.0.0",
////   "main": "./lib/index.tsx"
//// }

// @Filename: /project/packages/common/lib/index.tsx
//// export function Tooltip {};

// @Filename: /project/packages/app/package.json
//// {
////   "name": "@company/app",
////   "version": "1.0.0",
////   "dependencies": {
////     "@company/common": "1.0.0"
////   }
//// }

// @Filename: /project/packages/app/tsconfig.json
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

// @Filename: /project/packages/app/lib/index.ts
//// Tooltip/**/

// @link: /project/packages/common -> /project/node_modules/@company/common

goTo.marker("");
verify.importFixModuleSpecifiers("", ["@company/common"]);
