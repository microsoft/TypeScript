//// [tests/cases/compiler/classMemberWithMissingIdentifier.ts] ////

//// [classMemberWithMissingIdentifier.ts]
class C { 
    public {};
}

//// [classMemberWithMissingIdentifier.js]
"use strict";
class C {
    ;
}
{ }
;
