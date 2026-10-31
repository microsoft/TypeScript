// @target: es2015
// @allowJs: true
// @outDir: out

// @FileName: a.js
class c {
    method(a) {
        let x = a => this.method(a);
    }
}
