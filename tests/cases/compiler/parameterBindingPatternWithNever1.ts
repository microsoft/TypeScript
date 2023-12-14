// @strict: true
// @noEmit: true

function something(foo: string) {}

type ComplexTypeThatReturnsNever = never;

function somethingWrapper({ foo }: ComplexTypeThatReturnsNever) {
  something(foo);
}
