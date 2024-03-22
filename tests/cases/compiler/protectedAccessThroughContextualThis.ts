// @strict: true

class Foo {
  protected protec = 'bar';
  private privat = '';
  copy!: string
  constructor() {
    bindCopy.call(this)
    bindCopy2.call(this)
  }
}

function bindCopy(this: Foo) {
  this.copy = this.protec; // Should OK
  console.log(this.privat); // Should error
}

type BindingFunction = (this: Foo) => void;

const bindCopy2: BindingFunction = function () {
  this.copy = this.protec; // Should OK
  console.log(this.privat); // Should error
}