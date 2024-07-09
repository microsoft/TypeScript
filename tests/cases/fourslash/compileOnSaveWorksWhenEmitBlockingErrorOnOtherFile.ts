/// <reference path="fourslash.ts" />

// @BaselineFile: compileOnSaveWorksWhenEmitBlockingErrorOnOtherFile.baseline
// @allowJs: true
// @Filename: b.js
// @emitThisFile: true
////function foo() { } // This has error because js file cannot be overwritten - emitSkipped should be true

// @Filename: a.ts
// @emitThisFile: true
////function foo2() { return 30; } // no error - should emit a.js

verify.baselineGetEmitOutput();