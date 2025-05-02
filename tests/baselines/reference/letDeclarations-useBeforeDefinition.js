//// [tests/cases/compiler/letDeclarations-useBeforeDefinition.ts] ////

//// [letDeclarations-useBeforeDefinition.ts]
{
    l1;
    let l1;
}

var v1;
{
    v1;
    let v1 = 0;
}


//// [letDeclarations-useBeforeDefinition.js]
{
    l1;
    let l1;
}
var v1;
{
    v1;
    let v1 = 0;
}
