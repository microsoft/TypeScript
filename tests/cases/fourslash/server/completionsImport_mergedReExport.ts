/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /package.json
//// { "dependencies": { "@jest/types": "*", "ts-jest": "*" } }

// @Filename: /node_modules/@jest/types/index.d.ts
//// import type * as Config from "./Config";
//// export type { Config };

// @Filename: /node_modules/@jest/types/Config.d.ts
//// export interface ConfigGlobals {
////     [K: string]: unknown;
//// }

// @Filename: /node_modules/ts-jest/index.d.ts
//// export {};
//// declare module "@jest/types" {
////     namespace Config {
////         interface ConfigGlobals {
////             'ts-jest': any;
////         }
////     }
//// }

// @Filename: /index.ts
//// C/**/

verify.completions({
  marker: "",
  preferences: {
    includeCompletionsForModuleExports: true,
  },
});

edit.insert("o");

// Should not crash
verify.completions({
  marker: "",
  preferences: {
    includeCompletionsForModuleExports: true,
  },
});

// Because of the way `Config` is merged, we are actually not including it
// in completions here, though it would be better if we could. The `exports`
// of "@jest/types/index" would contain an alias symbol named `Config` without
// the merge from ts-jest, but with the merge, the `exports` contains the merge
// of `namespace Config` and the "@jest/types/Config" module symbol. This is
// unexpected (to me) and difficult to work with, and might be wrong? My
// expectation would have been to preserve the export alias symbol, but let it
// *resolve* to the merge of the SourceFile and the namespace declaration.
