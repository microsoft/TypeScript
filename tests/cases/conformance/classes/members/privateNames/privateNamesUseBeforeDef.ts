// @target: es2015

class A {
    #foo = this.#bar; // Error
    #bar = 3;
}

class B {
    #foo = this.#bar; // Error
    #bar = this.#foo;
}
