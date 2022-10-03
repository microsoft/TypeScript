interface I {
    x;
}

class B {
    constructor() {
        this.y: any;
    }
}

class C extends B implements I {
    constructor() {
        this.x: any;
    }
}

new C().x;
new C().y;

