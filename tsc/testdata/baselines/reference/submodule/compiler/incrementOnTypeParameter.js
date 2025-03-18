//// [tests/cases/compiler/incrementOnTypeParameter.ts] ////

//// [incrementOnTypeParameter.ts]
class C<T> {
    a: T;
    foo() {
        this.a++; 
        for (var i: T, j = 0; j < 10; i++) { 
        }
    }
}


//// [incrementOnTypeParameter.js]
class C {
    a;
    foo() {
        this.a++;
        for (var i, j = 0; j < 10; i++) {
        }
    }
}
