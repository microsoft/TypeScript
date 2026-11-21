// @declaration: true
// @stripInternal: true

interface Foo {}

export type T = (
    /** @internal */
    Foo
);

export const x: (
    /** @internal */
    Foo
) = {} as any;

export type T2 = readonly (
    /** @internal */
    Foo
)[];
