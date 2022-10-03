let C = class {
    foo() {
        return new C();
    }
};
let x = (new C).foo();
