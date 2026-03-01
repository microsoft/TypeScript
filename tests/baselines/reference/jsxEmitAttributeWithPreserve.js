//// [tests/cases/compiler/jsxEmitAttributeWithPreserve.tsx] ////

//// [jsxEmitAttributeWithPreserve.tsx]
declare var React: any;
<foo data/>

//// [jsxEmitAttributeWithPreserve.jsx]
"use strict";
<foo data/>;
