// @noUnusedLocals: true
// @lib: es6

const x = Symbol("x");
const y = Symbol("y");
class C {
    private [x]: number;
    private [y]: number;
    m() {
        this[x] = 0; // write-only
        this[y];
    }
}
