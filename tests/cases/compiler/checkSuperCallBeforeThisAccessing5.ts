// @target: es2015
class Based { constructor(...arg) { } }
class Derived extends Based {
    public x!: number;
    constructor() {
        super(this.x);
    }
}