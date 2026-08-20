// @target: es2015
// @allowJs: true
// @outFile: out.js

// @FileName: a.js
class c {
    method(a) {
        let x = a => this.method(a);
    }
}
