// @target: ES5

class MyBase {
  getValue(): number { return 1; }
  get value(): number { return 1; }
}

class MyDerived extends MyBase {
  constructor() {
    super();

    const f1 = super.getValue();
    const f2 = super.value;
  }
}

var d = new MyDerived();
var f3 = d.value;

class A {
    private _property: string;
    get property() { return this._property; }
    set property(value: string) { this._property = value }
}

class B extends A {
    set property(value: string) {
        super.property = value + " addition";
    }
}