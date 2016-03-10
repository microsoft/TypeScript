class Based { }
class Derived extends Based {
    public x: number;
    constructor() {
        this.x = 100;
        super();
        this.x = 10;
        var that = this;
    }
}