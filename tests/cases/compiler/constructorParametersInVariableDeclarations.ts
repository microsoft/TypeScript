class A {
    private a = x;
    private b = { p: x };
    private c = () => x;
    constructor(x: number) {
    }
}

class B {
    private a = x;
    private b = { p: x };
    private c = () => x;
    constructor() {
        var x = 1;
    }
}