//@module: commonjs
// @sourcemap: true
export namespace m {
    export class c {
    }
}
import a = m.c;
export import b = m.c;
var x = new a();
var y = new b();