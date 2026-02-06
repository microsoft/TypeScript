//// [tests/cases/compiler/reactNamespaceInvalidInput.tsx] ////

//// [reactNamespaceInvalidInput.tsx]
<foo data/>;


//// [reactNamespaceInvalidInput.js]
"use strict";
my-React-Lib.createElement("foo", { data: true });
