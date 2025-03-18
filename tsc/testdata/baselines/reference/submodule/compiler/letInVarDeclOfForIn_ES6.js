//// [tests/cases/compiler/letInVarDeclOfForIn_ES6.ts] ////

//// [letInVarDeclOfForIn_ES6.ts]
// should not be an error
for (var let in [1,2,3]) {}

{
	for (var let in [1,2,3]) {}
}


//// [letInVarDeclOfForIn_ES6.js]
for (var let in [1, 2, 3]) { }
{
    for (var let in [1, 2, 3]) { }
}
