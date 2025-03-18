//// [tests/cases/compiler/errorForBareSpecifierWithImplicitModuleResolutionNone.ts] ////

//// [errorForBareSpecifierWithImplicitModuleResolutionNone.ts]
// This would be classed as moduleResolutionKind: Classic

import { thing } from "non-existent-module";
thing()


//// [errorForBareSpecifierWithImplicitModuleResolutionNone.js]
import { thing } from "non-existent-module";
thing();
