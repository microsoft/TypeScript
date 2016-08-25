// @strictNullChecks: true

interface X {
    n: number
}
class C implements X {
    n = undefined;
}
class C2 implements X {
    n = null;
}
