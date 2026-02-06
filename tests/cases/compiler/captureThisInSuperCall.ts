// @target: es2015
class A {
    constructor(p:any) {}
}

class B extends A {
    constructor() { super({ test: () => this.someMethod()}); } 
    someMethod() {}
}