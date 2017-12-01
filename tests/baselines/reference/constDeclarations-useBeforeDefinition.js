//// [constDeclarations-useBeforeDefinition.ts]
{
    c1;
    const c1 = 0;
}

var v1;
{
    v1;
    const v1 = 0;
}


//// [constDeclarations-useBeforeDefinition.js]
{
    c1;
    const c1 = 0;
}
var v1;
{
    v1;
    const v1 = 0;
}
