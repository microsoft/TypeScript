// @target: es2015
class C<T> {
    a!: T;
    foo() {
        this.a++; 
        for (var i: T = this.a, j = 0; j < 10; i++) { 
        }
    }
}
