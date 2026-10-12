//// [tests/cases/compiler/malformedObjectDestructuringAssignmentClassFields.ts] ////

//// [malformedObjectDestructuringAssignmentClassFields.ts]
({x(A.#}=


//// [malformedObjectDestructuringAssignmentClassFields.js]
"use strict";
({ x(A) { }, : .# } =
);
