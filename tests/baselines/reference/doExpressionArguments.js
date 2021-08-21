//// [doExpressionArguments.ts]
async function* a(b, c, d) {
    console.log(arguments)
    arguments[1] = "before"
    console.log(b, c, d)
    console.log(do {
        yield;
        arguments[1] = "after";
        arguments;
    })
    console.log(b, c, d)
}
const gen = a(0, 1, 2)
gen.next().then(() => gen.next())
// Correct result:
// [Arguments] 0, 1, 2
// 0, "before", 2
// (inside do) [Arguments] 0, "after", 2
// 0, "after", 2


//// [doExpressionArguments.js]
async function* a(b, c, d) {
    var _a, _b;
    _b = arguments;
    console.log(arguments);
    arguments[1] = "before";
    console.log(b, c, d);
    console.log((yield* function* () {
        yield;
        _b[1] = "after";
        _a = _b;
    }.call(this), _a));
    console.log(b, c, d);
}
const gen = a(0, 1, 2);
gen.next().then(() => gen.next());
// Correct result:
// [Arguments] 0, 1, 2
// 0, "before", 2
// (inside do) [Arguments] 0, "after", 2
// 0, "after", 2
