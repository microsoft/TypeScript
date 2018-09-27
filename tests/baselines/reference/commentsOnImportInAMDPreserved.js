//// [commentsOnImportInAMDPreserved.ts]
// foo
import 'foo';

//// [commentsOnImportInAMDPreserved.js]
define(["require", "exports", "foo"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    // foo
});
