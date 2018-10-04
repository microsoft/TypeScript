//// [letInVarDeclOfForIn_ES6.ts]
// should not be an error
for (var let in [1,2,3]) {}

{
	for (var let in [1,2,3]) {}
}


//// [letInVarDeclOfForIn_ES6.js]
// should not be an error
for (var let in [1, 2, 3]) { }
{
    for (var let in [1, 2, 3]) { }
}
