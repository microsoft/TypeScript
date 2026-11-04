// @declaration: true
// @stripInternal: true

interface Foo {}
export type T =
    /** @internal */
    Foo;
