//// [tests/cases/compiler/assignToModule.ts] ////

//// [assignToModule.ts]
namespace A {}
A = undefined; // invalid LHS

//// [assignToModule.js]
"use strict";
A = undefined; // invalid LHS
