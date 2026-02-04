//// [tests/cases/compiler/tripleSlashReferenceAbsoluteWindowsPath.ts] ////

//// [c.ts]
const x = 5;

//// [d.ts]
/// <reference path="C:\a\b\c.ts" />
const y = x + 3;

//// [c.js]
"use strict";
const x = 5;
//// [d.js]
"use strict";
/// <reference path="C:\a\b\c.ts" />
const y = x + 3;
