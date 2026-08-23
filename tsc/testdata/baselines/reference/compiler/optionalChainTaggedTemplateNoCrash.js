//// [tests/cases/compiler/optionalChainTaggedTemplateNoCrash.ts] ////

//// [repro.ts]
e?.``(
//// [siblings.ts]
declare var a: any;
a?.b`c`;
a?.b`c`();
a?.``.x;


//// [repro.js]
"use strict";
e === null || e === void 0 ? void 0 : e ``();
//// [siblings.js]
"use strict";
var _a;
(a === null || a === void 0 ? void 0 : a.b) `c`;
(_a = a === null || a === void 0 ? void 0 : a.b) === null || _a === void 0 ? void 0 : _a `c`();
a === null || a === void 0 ? void 0 : a ``.x;
