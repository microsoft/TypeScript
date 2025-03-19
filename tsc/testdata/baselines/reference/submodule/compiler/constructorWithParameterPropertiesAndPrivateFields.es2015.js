//// [tests/cases/compiler/constructorWithParameterPropertiesAndPrivateFields.es2015.ts] ////

//// [constructorWithParameterPropertiesAndPrivateFields.es2015.ts]
// https://github.com/microsoft/TypeScript/issues/48771

class A {
  readonly #privateField: string;

  constructor(arg: { key: string }, public exposedField: number) {
    ({ key: this.#privateField } = arg);
  }

  log() {
    console.log(this.#privateField);
    console.log(this.exposedField);
  }
}

class B {
  readonly #privateField: string;

  constructor(arg: { key: string }, public exposedField: number) {
    "prologue";
    ({ key: this.#privateField } = arg);
  }

  log() {
    console.log(this.#privateField);
    console.log(this.exposedField);
  }
}


//// [constructorWithParameterPropertiesAndPrivateFields.es2015.js]
// https://github.com/microsoft/TypeScript/issues/48771
class A {
    exposedField;
    #privateField;
    constructor(arg, exposedField) {
        this.exposedField = exposedField;
        ({ key: this.#privateField } = arg);
    }
    log() {
        console.log(this.#privateField);
        console.log(this.exposedField);
    }
}
class B {
    exposedField;
    #privateField;
    constructor(arg, exposedField) {
        "prologue";
        "prologue";
        this.exposedField = exposedField;
        ({ key: this.#privateField } = arg);
    }
    log() {
        console.log(this.#privateField);
        console.log(this.exposedField);
    }
}
