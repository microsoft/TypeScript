declare function dec<T>(target: T): T;

class A {
    @dec                // Error
    #foo = 1;
    @dec                // Error
    #bar(): void { }
}
