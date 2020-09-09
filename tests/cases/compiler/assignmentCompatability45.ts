abstract class A {}
class B extends A {
    constructor(x: number) {
        super();
    }
}
const b: typeof A = B;
