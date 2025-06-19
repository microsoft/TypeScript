//// [tests/cases/compiler/superNoModifiersCrash.ts] ////

//// [File.js]
class Parent {
    initialize() {
        super.initialize(...arguments)
        return this.asdf = ''
    }
  }

class Child extends Parent {
    initialize() {
    }
}

//// [File.js]
class Parent {
    initialize() {
        super.initialize(...arguments);
        return this.asdf = '';
    }
}
class Child extends Parent {
    initialize() {
    }
}
