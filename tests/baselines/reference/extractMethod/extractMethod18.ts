// ==ORIGINAL==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        t1.toString();
    }
}
// ==SCOPE::method in class 'C'==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        this./*RENAME*/newFunction<T1>(t1);
    }

    private newFunction<T1>(t1: T1) {
        t1.toString();
    }
}
// ==SCOPE::function in global scope==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        /*RENAME*/newFunction<T1>(t1);
    }
}
function newFunction<T1>(t1: T1) {
    t1.toString();
}
