// ==ORIGINAL==
class C<T1, T2> {
    M(t1: T1, t2: T2) {
        t1.toString();
    }
}
// ==SCOPE::method in class 'C'==
class C<T1, T2> {
    M(t1: T1, t2: T2) {
        this./*RENAME*/newFunction(t1);
    }

    private newFunction(t1: T1) {
        t1.toString();
    }
}
// ==SCOPE::function in global scope==
class C<T1, T2> {
    M(t1: T1, t2: T2) {
        /*RENAME*/newFunction<T1>(t1);
    }
}
function newFunction<T1>(t1: T1) {
    t1.toString();
}
