//// [errorForBareSpecifierWithImplicitModuleResolution1.ts]
import { thing } from "non-existent-module";
thing()

//// [errorForBareSpecifierWithImplicitModuleResolution1.js]
import { thing } from "non-existent-module";
thing();
