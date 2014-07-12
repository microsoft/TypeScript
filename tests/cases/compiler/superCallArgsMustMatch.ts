class T5<T>{

    public foo: T;

    constructor(public bar: T) { }

}

 

class T6 extends T5<number>{

    constructor() {

        super("hi"); // Should error, base constructor has type T for first arg, which is fixed as number in the extends clause

        var x: number = this.foo;

    }

}

