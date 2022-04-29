module m1 {
    export interface m1 {
    }
    export class m2 implements m1 {
    }
}
var foo = new m1.m2();