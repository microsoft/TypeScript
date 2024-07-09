// @strict: true

class Foo {
    x: number | undefined;

    constructor() {
        this.x = 5;

        this.x;    // number
        this['x']; // number

        const key = 'x';
        this[key]; // number
    }
}
