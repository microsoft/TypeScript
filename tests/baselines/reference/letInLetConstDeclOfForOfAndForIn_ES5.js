//// [tests/cases/compiler/letInLetConstDeclOfForOfAndForIn_ES5.ts] ////

//// [letInLetConstDeclOfForOfAndForIn_ES5.ts]
// Should be an error
for (let let of [1,2,3]) {}

for (const let of [1,2,3]) {}

for (let let in [1,2,3]) {}

for (const let in [1,2,3]) {}

{
	for (let let of [1,2,3]) {}

	for (const let of [1,2,3]) {}
	
	for (let let in [1,2,3]) {}

	for (const let in [1,2,3]) {}
}



//// [letInLetConstDeclOfForOfAndForIn_ES5.js]
// Should be an error
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    var let = _a[_i];
}
for (var _b = 0, _c = [1, 2, 3]; _b < _c.length; _b++) {
    var let = _c[_b];
}
for (var let in [1, 2, 3]) { }
for (var let in [1, 2, 3]) { }
{
    for (var _d = 0, _e = [1, 2, 3]; _d < _e.length; _d++) {
        var let = _e[_d];
    }
    for (var _f = 0, _g = [1, 2, 3]; _f < _g.length; _f++) {
        var let = _g[_f];
    }
    for (var let in [1, 2, 3]) { }
    for (var let in [1, 2, 3]) { }
}
