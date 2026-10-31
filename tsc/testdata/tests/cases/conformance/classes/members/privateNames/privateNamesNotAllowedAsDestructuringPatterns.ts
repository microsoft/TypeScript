// @target: es2022

class A {
    #foo = 1;
    bar() {
        const { #foo: foo } = this;
        let bar;
        ({ #foo: bar } = this);
    }
}
