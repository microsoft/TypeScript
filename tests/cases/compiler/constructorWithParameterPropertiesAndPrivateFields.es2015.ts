// @target: es2015
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
