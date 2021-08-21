//@target: ES2021
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
