// ==ORIGINAL==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        t1.toString();
    }
}
// ==SCOPE::class 'C'==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        this.newFunction<T1>(t1);
    }

    private newFunction<T1>(t1: T1) {
        t1.toString();
    }
}
// ==SCOPE::global scope==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        newFunction<T1>(t1);
    }
}
function newFunction<T1>(t1: T1) {
    t1.toString();
}
