// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @lib: esnext
// @Filename: a.js
function* f() {
    var o
    while (true) {
        o = yield o
    }
}

// @Filename: b.ts
function* g() {
    var o = []
    while (true) {
        o = yield* o
    }
}
