//// [tests/cases/compiler/letInVarDeclOfForOf_ES5.ts] ////

//// [letInVarDeclOfForOf_ES5.ts]
// should not be an error
for (var let of [1,2,3]) {}

{
	for (var let of [1,2,3]) {}
}


//// [letInVarDeclOfForOf_ES5.js]
// should not be an error
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    var let = _a[_i];
}
{
    for (var _b = 0, _c = [1, 2, 3]; _b < _c.length; _b++) {
        var let = _c[_b];
    }
}
