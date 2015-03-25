// @target:es6
declare function dec<T>(target: T): T;

module Outer {
  @dec
  export class C {
  }
}