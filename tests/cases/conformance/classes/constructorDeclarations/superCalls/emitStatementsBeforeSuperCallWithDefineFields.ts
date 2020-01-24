// @useDefineForClassFields: true
// @target: es2015
// TODO: With false, master is correct for `Test` but incorrect for `Sub`.
// `Test` is correct because classic emit doesn't emit for definition and `Test`
// doesn't need to emit any code for initialisation because it's already
// part of the user code

class Base {
}
class Sub extends Base {
    // @ts-ignore
    constructor(public p: number) {
        console.log('hi');
        super();
    }
    field = 0;
}

class Test extends Base {
    prop: number;
    // @ts-ignore
    constructor(public p: number) {
        1;
        super();
        this.prop = 1;
    }
}
