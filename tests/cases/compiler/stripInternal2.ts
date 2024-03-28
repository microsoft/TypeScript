// @declaration:true
// @stripInternal:true

export class Foo {
  /**
   * Should be stripped
   * @internal
   */
  shouldBeStripped = 1;

  // TODO: maybe make this @internal?
  /**
   * Should *not* be stripped
   */
  shouldNotBeStripped = 2;
}