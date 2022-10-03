class T5<T>{

    public foo: T;

    constructor(public bar: T) { }

}

 

class T6 extends T5<number>{

    constructor() {

        // Should error; base constructor has type T for first arg,
        // which is instantiated with 'number' in the extends clause
        super("hi");

        var x: number = this.foo;

    }

}

