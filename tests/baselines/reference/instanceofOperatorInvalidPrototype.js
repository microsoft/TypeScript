//// [tests/cases/compiler/instanceofOperatorInvalidPrototype.ts] ////

//// [instanceofOperatorInvalidPrototype.ts]
TypeError instanceof (() => 1);

const arrowFunction = () => 1;
TypeError instanceof arrowFunction;

function allowed() {}
TypeError instanceof allowed;


//// [instanceofOperatorInvalidPrototype.js]
TypeError instanceof (function () { return 1; });
var arrowFunction = function () { return 1; };
TypeError instanceof arrowFunction;
function allowed() { }
TypeError instanceof allowed;
