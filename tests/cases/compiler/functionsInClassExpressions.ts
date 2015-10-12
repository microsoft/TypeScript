let Foo = class {
    constructor() {
        this.bar++;
    }
    bar = 0;
    inc = () => {
        this.bar++;
    }
    m() { return this.bar; }
}