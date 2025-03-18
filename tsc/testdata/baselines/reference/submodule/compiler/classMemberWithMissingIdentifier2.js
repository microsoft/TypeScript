//// [tests/cases/compiler/classMemberWithMissingIdentifier2.ts] ////

//// [classMemberWithMissingIdentifier2.ts]
class C { 
    public {[name:string]:VariableDeclaration};
}

//// [classMemberWithMissingIdentifier2.js]
class C {
    ;
}
{
    [name, string];
    VariableDeclaration;
}
;
