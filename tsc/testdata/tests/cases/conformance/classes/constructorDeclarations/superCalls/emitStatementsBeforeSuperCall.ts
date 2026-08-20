// @useDefineForClassFields: false
// @target: es2015

class Base {
}
class Sub extends Base {
    // @ts-ignore
    constructor(public p: number) {
        console.log('hi'); // should emit before super
        super();
    }
    field = 0;
}

class Test extends Base {
    prop: number;
    // @ts-ignore
    constructor(public p: number) {
        1; // should emit before super
        super();
        this.prop = 1;
    }
}
