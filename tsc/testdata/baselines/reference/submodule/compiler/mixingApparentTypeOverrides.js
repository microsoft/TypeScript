//// [tests/cases/compiler/mixingApparentTypeOverrides.ts] ////

//// [mixingApparentTypeOverrides.ts]
type Constructor<T> = new(...args: any[]) => T;
function Tagged<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    _tag: string;
    constructor(...args: any[]) {
      super(...args);
      this._tag = "";
    }
  };
}

class A {
  toString () {
    return "class A";
  }
}

class B extends Tagged(A) {
  toString () { // Should not be an error
    return "class B";
  }
}

class C extends A {
  toString () { // Should not be an error
    return "class C";
  }
}

//// [mixingApparentTypeOverrides.js]
function Tagged(Base) {
    return class extends Base {
        _tag;
        constructor(...args) {
            super(...args);
            this._tag = "";
        }
    };
}
class A {
    toString() {
        return "class A";
    }
}
class B extends Tagged(A) {
    toString() {
        return "class B";
    }
}
class C extends A {
    toString() {
        return "class C";
    }
}
