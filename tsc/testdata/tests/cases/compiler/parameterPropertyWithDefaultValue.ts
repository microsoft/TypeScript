// @target: es2015
// @declaration: true
// @exactOptionalPropertyTypes: true
// @strict: true

export class SomeClass {
  constructor(readonly timestamp = new Date()) {}
}