// @target: es6
class B {
    x = 10;
    constructor() {
        this.x = 10;
    }
    foo() {
        console.log(this.x);
    }

    get X() {
        return this.x;
    }

    set bX(y: number) {
        this.x = y;
    }
}