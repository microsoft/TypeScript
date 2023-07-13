// @strict: true
// @noEmit: true

class Foo<Elements extends readonly unknown[]> {
  public readonly elements: { [P in keyof Elements]: { bar: Elements[P] } };

  public constructor(
    ...elements: { [P in keyof Elements]: { bar: Elements[P] } }
  ) {
    this.elements = elements;
  }

  public add(): Foo<[...Elements, "abc"]> {
    return new Foo<[...Elements, "abc"]>(...this.elements, { bar: "abc" });
  }
}
