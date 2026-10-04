//// [tests/cases/compiler/definiteAssignmentWithErrorStillStripped.ts] ////

//// [definiteAssignmentWithErrorStillStripped.ts]
class C {
    p!;
}

//// [definiteAssignmentWithErrorStillStripped.js]
"use strict";
class C {
    p;
}
