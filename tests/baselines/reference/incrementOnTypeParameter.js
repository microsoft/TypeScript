//// [tests/cases/compiler/incrementOnTypeParameter.ts] ////

//// [incrementOnTypeParameter.ts]
class C<T> {
    a!: T;
    foo() {
        this.a++; 
        for (var i: T = this.a, j = 0; j < 10; i++) { 
        }
    }
}


//// [incrementOnTypeParameter.js]
class C {
    foo() {
        this.a++;
        for (var i = this.a, j = 0; j < 10; i++) {
        }
    }
}
