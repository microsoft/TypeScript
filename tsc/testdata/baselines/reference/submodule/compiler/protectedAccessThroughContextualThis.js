//// [tests/cases/compiler/protectedAccessThroughContextualThis.ts] ////

//// [protectedAccessThroughContextualThis.ts]
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

//// [protectedAccessThroughContextualThis.js]
class Foo {
    protec = 'bar';
    privat = '';
    copy;
    constructor() {
        bindCopy.call(this);
        bindCopy2.call(this);
    }
}
function bindCopy() {
    this.copy = this.protec;
    console.log(this.privat);
}
const bindCopy2 = function () {
    this.copy = this.protec;
    console.log(this.privat);
};
