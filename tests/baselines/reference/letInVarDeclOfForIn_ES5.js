//// [letInVarDeclOfForIn_ES5.ts]
// should not be an error
for (var let in [1,2,3]) {}

{
	for (var let in [1,2,3]) {}
}


//// [letInVarDeclOfForIn_ES5.js]
// should not be an error
for (var let in [1, 2, 3]) { }
{
    for (var let in [1, 2, 3]) { }
}
