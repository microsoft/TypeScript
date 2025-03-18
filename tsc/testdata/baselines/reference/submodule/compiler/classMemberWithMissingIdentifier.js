//// [tests/cases/compiler/classMemberWithMissingIdentifier.ts] ////

//// [classMemberWithMissingIdentifier.ts]
class C { 
    public {};
}

//// [classMemberWithMissingIdentifier.js]
class C {
    ;
}
{ }
;
