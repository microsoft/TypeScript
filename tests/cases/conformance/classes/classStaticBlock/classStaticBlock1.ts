// @target: esnext, es2015, es5
const a = 2;

class C {
    static {
        const a = 1;

        a;
    }
}
