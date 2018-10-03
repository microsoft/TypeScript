// @strictNullChecks: true
// https://github.com/Microsoft/TypeScript/issues/20994
interface Options {
    a?: number | object;
    b: () => void;
}

class C<T extends Options> {
    foo!: { [P in keyof T]: T[P] }

    method() {
        let { a, b } = this.foo;
        !(a && b);
        a;
    }
}