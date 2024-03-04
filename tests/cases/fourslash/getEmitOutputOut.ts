/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputOut.baseline
// @outFile: out.js

// @Filename: my.d.ts
// @emitThisFile: false
////declare module foo.bar {
////    class Baz { }
////}

// @Filename: input0.ts
// @emitThisFile: false
/////// <reference path='my.d.ts' />
////module foo.bar {
////    var baz1 = <any>Baz.prototype; // Should emit as bar.Baz.prototype
////}

// @Filename: input1.ts
// @emitThisFile: true
////var x;

verify.baselineGetEmitOutput();
