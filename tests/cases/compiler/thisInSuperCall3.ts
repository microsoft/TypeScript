class Base { 
    constructor(a: any) {}
}

class Foo extends Base {
    public x: number = 0;

    constructor() {
        super(this);
    }
}
