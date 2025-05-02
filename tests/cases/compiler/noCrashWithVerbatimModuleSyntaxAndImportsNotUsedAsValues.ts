// @verbatimModuleSyntax: true
// @importsNotUsedAsValues: error
// @ignoreDeprecations: 5.0
// @filename: file.ts
export class A {}
// @filename: index.ts
import {A} from "./file";

const a: A = null as any;