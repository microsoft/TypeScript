//// [tests/cases/compiler/constructorArgs.ts] ////

//// [constructorArgs.ts]
interface Options {
 value: number;
}

class Super {
 constructor(value:number) {
 }
}

class Sub extends Super {
 constructor(public options:Options) {
  super(options.value);
 } 
}


//// [constructorArgs.js]
class Super {
    constructor(value) {
    }
}
class Sub extends Super {
    options;
    constructor(options) {
        this.options = options;
        super(options.value);
    }
}
