/// <reference path="fourslash.ts" />

// @Filename: package.json
////{
////    "type": "module"
////}
// @Filename: tsconfig.json
////{
////    "compilerOptions": {
////        "outDir": "./dist",
////        "module": "node12",
////        "target": "esnext"
////    },
////    "include": ["./src"]
////}
// @Filename: src/index.mts
////import { util } from /*import*/'./deps.mts'
////export function main() {
////    util()
////}
// @Filename: src/deps.mts
////export function util() {}

verify.baselineSyntacticAndSemanticDiagnostics();
goTo.marker("import");
edit.replace(test.markers()[0].position, "'./deps.mts'".length, "'./deps.mjs'");
verify.noErrors();