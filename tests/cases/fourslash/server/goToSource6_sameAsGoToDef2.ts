/// <reference path="../fourslash.ts" />

// @Filename: /node_modules/foo/package.json
//// { "name": "foo", "version": "1.2.3", "typesVersions": { "*": { "*": ["./types/*"] } } }

// @Filename: /node_modules/foo/src/a.ts
//// export const /*end*/a = 'a';

// @Filename: /node_modules/foo/types/a.d.ts
//// export declare const a: string;
//// //# sourceMappingURL=a.d.ts.map

// @Filename: /node_modules/foo/types/a.d.ts.map
//// {"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,EAAE,OAAO,CAAC;;AACvB,wBAAsB"}

// @Filename: /node_modules/foo/dist/a.js
//// export const a = 'a';

// @Filename: /b.ts
//// import { a } from 'foo/a';
//// [|a/*start*/|]

verify.baselineGoToSourceDefinition("start");
verify.baselineGoToDefinition("start");

