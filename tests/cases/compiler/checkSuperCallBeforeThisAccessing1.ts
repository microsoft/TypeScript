class Based { }
class Derived extends Based {
    public x: number;
    constructor() {
        super();
        this;
        this.x = 10;
        var that = this;
    }
}