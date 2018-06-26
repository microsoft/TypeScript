// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: bug25149.js
function* f() {
    var o
    while (true) {
        o = yield o
    }
}

// @Filename: alsoFails.ts
// fails in Typescript too
function* g() {
    var o = []
    while (true) {
        o = yield* o
    }
}
