/// <reference path="../fourslash.ts" />

// @Filename: /shared/tsconfig.json
//// {
////   compilerOptions: {
////       target: "es5",
////       composite: true,
////       outDir: "dist"
////   }
//// }

// @Filename: /shared/red.ts
//// export const red = 'fish';

// @Filename: /shared/dist/package.json
//// { "type": "module" }

// @Filename: /src/tsconfig.json
//// {
////   compilerOptions: {
////       target: "es5",
////       module: "nodenext",
////       noEmit: true,
////   },
////   references: [{ path: "../shared" }]
//// }

// @Filename: /src/index.ts
//// import { red } from [|'../shared/red'|];

goTo.file("/src/index.ts");
verify.baselineSyntacticAndSemanticDiagnostics();
