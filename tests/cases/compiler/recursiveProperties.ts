// @target: ES5
class A {
    get testProp() { return this.testProp; }
}

class B {
    set testProp(value:string) { this.testProp = value; }
}