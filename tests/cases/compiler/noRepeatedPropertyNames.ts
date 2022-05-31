// @strict: false
// https://github.com/microsoft/TypeScript/issues/46815
const first = { a: 1, a: 2 };
class C {
    m() {
        const second = { a: 1, a: 2 };
        return second.a;
    }
}
