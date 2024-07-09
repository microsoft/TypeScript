/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /node_modules/.pnpm/mobx@6.0.4/node_modules/MobX/Foo.d.ts
//// export declare function autorun(): void;

// @Filename: /index.ts
//// autorun/**/

// @Filename: /utils.ts
//// import "MobX/Foo";

// @link: /node_modules/.pnpm/mobx@6.0.4/node_modules/MobX -> /node_modules/MobX
// @link: /node_modules/.pnpm/mobx@6.0.4/node_modules/MobX -> /node_modules/.pnpm/cool-mobx-dependent@1.2.3/node_modules/MobX

goTo.marker("");
verify.importFixAtPosition([`import { autorun } from "MobX/Foo";

autorun`]);
