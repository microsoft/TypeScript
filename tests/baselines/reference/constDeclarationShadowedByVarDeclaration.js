//// [tests/cases/compiler/constDeclarationShadowedByVarDeclaration.ts] ////

//// [constDeclarationShadowedByVarDeclaration.ts]
// Error as declaration of var would cause a write to the const value
var x = 0;
{
    const x = 0;

    var x = 0;
}


var y = 0;
{
    const y = 0;
    {
        var y = 0;
    }
}


{
  const z = 0;
  var z = 0
}

//// [constDeclarationShadowedByVarDeclaration.js]
// Error as declaration of var would cause a write to the const value
var x = 0;
{
    const x = 0;
    var x = 0;
}
var y = 0;
{
    const y = 0;
    {
        var y = 0;
    }
}
{
    const z = 0;
    var z = 0;
}
