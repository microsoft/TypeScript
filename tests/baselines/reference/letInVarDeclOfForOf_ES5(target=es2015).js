//// [tests/cases/compiler/letInVarDeclOfForOf_ES5.ts] ////

//// [letInVarDeclOfForOf_ES5.ts]
// should not be an error
for (var let of [1,2,3]) {}

{
	for (var let of [1,2,3]) {}
}


//// [letInVarDeclOfForOf_ES5.js]
// should not be an error
for (var let of [1, 2, 3]) { }
{
    for (var let of [1, 2, 3]) { }
}
