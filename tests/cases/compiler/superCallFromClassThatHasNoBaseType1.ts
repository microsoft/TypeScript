
class A {
    constructor(private map: (value: number) => string) {

    }
}

class B {
    constructor() { super(value => String(value)); }
}