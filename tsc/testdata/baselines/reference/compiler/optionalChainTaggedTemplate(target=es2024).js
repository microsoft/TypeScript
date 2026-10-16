//// [tests/cases/compiler/optionalChainTaggedTemplate.ts] ////

//// [repro.ts]
e?.``(

//// [siblings.ts]
declare var a: any;
a?.b`c`;
a?.b`c`();
a?.``.x;


//// [repro.js]
"use strict";
e ``();
//// [siblings.js]
"use strict";
(a?.b) `c`;
(a?.b) `c`();
a ``.x;
