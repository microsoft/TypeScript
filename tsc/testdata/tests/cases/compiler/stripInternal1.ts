// @target: es2015
// @declaration:true
// @stripInternal:true

class C {
  foo(): void { }
  // @internal
  bar(): void { }
}