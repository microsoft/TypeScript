abstract class A {
    abstract foo(): void;
}

var C = class extends A {     // no error reported!
};

