//// [tests/cases/compiler/jsxImportSourceNonModuleAmbient.tsx] ////

//// [ambient.d.ts]


//// [index.tsx]
const x = <><div>hi</div></>;


//// [index.jsx]
"use strict";
const x = <><div>hi</div></>;
