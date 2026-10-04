//// [tests/cases/compiler/dataViewConstructor.ts] ////

//// [dataViewConstructor.ts]
new DataView(new Uint8Array(32)); // should error

//// [dataViewConstructor.js]
"use strict";
new DataView(new Uint8Array(32)); // should error
