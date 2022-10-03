/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
// @Filename: fixExactOptionalUnassignableProperties2.ts
//// import { INodeModules } from 'foo'
//// interface J {
////     a?: number | undefined
//// }
//// declare var inm: INodeModules
//// declare var j: J
//// inm/**/ = j
//// console.log(inm)
// @Filename: node_modules/@types/foo/index.d.ts
//// export interface INodeModules {
////     a?: number
//// }
verify.codeFixAvailable([]);
