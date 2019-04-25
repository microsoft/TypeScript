class C {
    x: number;
    "constructor"() {
        this.x = 0;
    }
}
(new C).constructor(); // Error

class D {
    x: number;
    'constructor'() {
        this.x = 0;
    }
}
(new C).constructor(); // Error

class E {
    x: number;
    ['constructor']() {
        this.x = 0;
    }
}
(new E).constructor();
