// @strictNullChecks: true
interface X {
    n: number
}
class C implements X { // error, n: undefined isn't assignable to n: number
    n = undefined;
}
class C2 implements X {
    n = null;
}
