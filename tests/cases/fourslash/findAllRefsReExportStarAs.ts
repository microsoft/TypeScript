/// <reference path="fourslash.ts" />

// @Filename: /leafModule.ts
////export const /*helloDef*/hello = () => 'Hello';

// @Filename: /exporting.ts
////export * as /*leafDef*/Leaf from './leafModule';

// @Filename: /importing.ts
//// import { /*leafImportDef*/Leaf } from './exporting';
//// /*leafUse*/[|Leaf|]./*helloUse*/[|hello|]()

verify.noErrors();
verify.baselineFindAllReferences('helloDef', 'helloUse', 'leafDef', 'leafImportDef', 'leafUse')
