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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_privateField, _B_privateField;
class A {
    constructor(arg, exposedField) {
        var _a;
        this.exposedField = exposedField;
        _A_privateField.set(this, void 0);
        (_a = this, { key: ({ set value(_b) { __classPrivateFieldSet(_a, _A_privateField, _b, "f"); } }).value } = arg);
    }
    log() {
        console.log(__classPrivateFieldGet(this, _A_privateField, "f"));
        console.log(this.exposedField);
    }
}
_A_privateField = new WeakMap();
class B {
    constructor(arg, exposedField) {
        "prologue";
        var _a;
        this.exposedField = exposedField;
        _B_privateField.set(this, void 0);
        (_a = this, { key: ({ set value(_b) { __classPrivateFieldSet(_a, _B_privateField, _b, "f"); } }).value } = arg);
    }
    log() {
        console.log(__classPrivateFieldGet(this, _B_privateField, "f"));
        console.log(this.exposedField);
    }
}
_B_privateField = new WeakMap();
