//// [tests/cases/compiler/reactNamespaceMissingDeclaration.tsx] ////

//// [reactNamespaceMissingDeclaration.tsx]
// Error myReactLib not declared
<foo data/>

//// [reactNamespaceMissingDeclaration.js]
"use strict";
// Error myReactLib not declared
myReactLib.createElement("foo", { data: true });
