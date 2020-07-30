// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: a.cjs
export {}; // error
import.meta; // error

// @filename: c.cjs
// this is not in strict mode but class definitions are always in strict mode

class c {
    a(eval) { //error
    }
    method() {
        var let = 10; // error
    }
}
