// ==ORIGINAL==
class C {
    M1() { }
    M2() {
        /*[#|*/return 1;/*|]*/
    }
    M3() { }
}
// ==SCOPE::Extract to inner function in method 'M2'==
class C {
    M1() { }
    M2() {
        return /*RENAME*/newFunction();

        function newFunction() {
            return 1;
        }
    }
    M3() { }
}
// ==SCOPE::Extract to method in class 'C'==
class C {
    M1() { }
    M2() {
        return this./*RENAME*/newMethod();
    }
    newMethod() {
        return 1;
    }

    M3() { }
}
// ==SCOPE::Extract to function in global scope==
class C {
    M1() { }
    M2() {
        return /*RENAME*/newFunction();
    }
    M3() { }
}

function newFunction() {
    return 1;
}
