//// [errorForBareSpecifierWithImplicitModuleResolutionNone.ts]
// This would be classed as moduleResolutionKind: Classic

import { thing } from "non-existent-module";
thing()


//// [errorForBareSpecifierWithImplicitModuleResolutionNone.js]
// This would be classed as moduleResolutionKind: Classic
import { thing } from "non-existent-module";
thing();
