// ==ORIGINAL==
class C<T1, T2> {
    M(t1: T1, t2: T2) {
        t1.toString();
    }
}
// ==SCOPE::class 'C'==
class C<T1, T2> {
    M(t1: T1, t2: T2) {
        this.newFunction(t1);
    }

    private newFunction(t1: T1) {
        t1.toString();
    }
}
// ==SCOPE::global scope==
class C<T1, T2> {
    M(t1: T1, t2: T2) {
        newFunction<T1>(t1);
    }
}
function newFunction<T1>(t1: T1) {
    t1.toString();
}
