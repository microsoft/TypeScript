// class 
export class X8 {
    constructor() {
    } 

    // x2 BUG not in the right place at all
    x2 = function foo(): string {
        // does
        return x1();
    }
}