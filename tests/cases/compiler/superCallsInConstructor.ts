class C {
    foo() {}
    bar() {}
}

class Base {
    x: string;
}
 
class Derived extends Base {
    constructor() {
        with(new C()) {
            foo();
            super();
            bar();
        }

        try {} catch(e) { super(); }
    }
}