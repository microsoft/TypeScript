// ==ORIGINAL==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        /*[#|*/t1.toString()/*|]*/;
    }
}
// ==SCOPE::Extract to inner function in method 'M'==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        /*RENAME*/newFunction();

        function newFunction() {
            t1.toString();
        }
    }
}
// ==SCOPE::Extract to method in class 'C'==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        this./*RENAME*/newMethod<T1>(t1);
    }

    private newMethod<T1>(t1: T1) {
        t1.toString();
    }
}
// ==SCOPE::Extract to function in global scope==
class C {
    M<T1, T2>(t1: T1, t2: T2) {
        /*RENAME*/newFunction<T1>(t1);
    }
}

function newFunction<T1>(t1: T1) {
    t1.toString();
}
